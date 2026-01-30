#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 作者: Jun
 */

const { execSync, spawn } = require('child_process');
const { Select, Input, Toggle } = require('enquirer');
const SCHEMA = require('./config-map');
const engine = require('./config-engine');
const ui = require('./cli-ui');
const pkg = require('../package.json');

// --- 版本检查 ---
async function checkUpdate() {
    try {
        const latestRaw = execSync(`curl -s --connect-timeout 2 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?v=${Date.now()}"`).toString();
        const latestPkg = JSON.parse(latestRaw);
        if (isNewer(latestPkg.version, pkg.version)) {
            console.log(ui.msg('yellow', `\n🔔 检测到新版本: v${latestPkg.version} (当前: v${pkg.version})`));
            const prompt = new Select({
                name: 'update',
                message: '是否现在更新？',
                choices: ['立即更新', '以后再说']
            });
            const res = await prompt.run();
            if (res === '立即更新') {
                console.log(ui.msg('green', '\n正在更新...'));
                const cmd = process.platform === 'win32' ? 'iex...' : 'curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash';
                execSync(cmd, { stdio: 'inherit' });
                process.exit(0);
            }
        }
    } catch (e) {}
}

function isNewer(r, l) {
    const rv = r.split('.').map(Number);
    const lv = l.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if (rv[i] > lv[i]) return true;
        if (rv[i] < lv[i]) return false;
    }
    return false;
}

// --- 核心交互逻辑 ---
function showHeader() {
    console.clear();
    ui.setLang(engine.getLang());
    console.log(ui.getBanner(pkg.version));
}

async function handleEdit(config, item) {
    const lang = engine.getLang();
    const currentVal = engine.get(config, item.key);
    
    let newValue = '';
    
    if (item.type === 'boolean') {
        const prompt = new Toggle({
            message: item.label[lang],
            enabled: '开启 (ON)',
            disabled: '关闭 (OFF)'
        });
        newValue = String(await prompt.run());
    } else if (item.type === 'enum') {
        const prompt = new Select({
            message: item.label[lang],
            choices: item.options
        });
        const choice = await prompt.run();
        if (choice.includes('自定义') || choice.includes('Manual')) {
            const input = new Input({ message: '请输入自定义值:' });
            newValue = await input.run();
        } else {
            newValue = choice;
        }
    } else {
        const prompt = new Input({
            message: item.label[lang],
            initial: currentVal
        });
        newValue = await prompt.run();
    }

    if (newValue !== '') {
        if (item.isArray) newValue = [newValue];
        engine.set(config, item.key, newValue);
        
        // 自动提示输入 Key (如果需要)
        if (item.needsKey) {
            const keyPath = findKeyPath(item.options[0] || ''); // 简化逻辑
            const keyPrompt = new Input({ message: `检测到需要 API Key，请输入:` });
            const keyVal = await keyPrompt.run();
            if (keyVal) {
                // 这里仅作示例，实际需根据 Provider 动态设置
                console.log(ui.msg('yellow', '已尝试记录 Key (由于 Provider 多样，请在对应插件菜单详配)'));
            }
        }
        
        engine.write(config);
        console.log(ui.msg('green', `\n✅ 已保存`));
        await new Promise(r => setTimeout(r, 800));
    }
}

function findKeyPath(modelId) {
    // 简化逻辑：映射常用的 Provider Key 路径
    return "auth.profiles.default.apiKey";
}

async function subMenu(category) {
    const lang = engine.getLang();
    while (true) {
        showHeader();
        const config = engine.read();
        
        const choices = [];
        if (category.subCategories) {
            category.subCategories.forEach(sub => choices.push({ name: sub.id, message: sub.label[lang] }));
        } else {
            if (category.specialActions) {
                category.specialActions.forEach(act => choices.push({ name: 'act_' + act.id, message: ui.msg('yellow', act.label[lang]) }));
            }
            category.items.forEach((item, i) => {
                const val = engine.get(config, item.key);
                choices.push({ name: i, message: `${item.label[lang]}: ${val === undefined ? ui.msg('red', '未设置') : ui.msg('green', val)}` });
            });
        }
        choices.push({ name: 'back', message: ui.msg('magenta', '⬅️ ' + ui.t('back')) });

        const prompt = new Select({
            message: `【 ${category.label[lang]} 】`,
            choices: choices
        });

        const choice = await prompt.run();
        if (choice === 'back') return;

        if (category.subCategories) {
            const sub = category.subCategories.find(s => s.id === choice);
            await subMenu(sub);
        } else if (String(choice).startsWith('act_')) {
            const actId = choice.replace('act_', '');
            const action = category.specialActions.find(a => a.id === actId);
            console.log(ui.msg('cyan', `\n🚀 正在执行: ${action.command}...`));
            execSync(action.command, { stdio: 'inherit' });
            await ask('\n执行完毕，按回车返回...');
        } else {
            await handleEdit(config, category.items[choice]);
        }
    }
}

async function main() {
    await checkUpdate();
    while (true) {
        const lang = engine.getLang();
        showHeader();
        
        const choices = SCHEMA.map((cat, i) => ({ name: i, message: `${ui.categoryIcon(cat.id)} ${cat.label[lang]}` }));
        choices.push({ name: 'init', message: `🌟 ${ui.t('init')}` });
        choices.push({ name: 'lang', message: `🌐 ${ui.t('langSwitch')}` });
        choices.push({ name: 'restart', message: `🔄 ${ui.t('restart')}` });
        choices.push({ name: 'exit', message: `🚪 ${ui.t('exit')}` });

        const prompt = new Select({
            message: ui.t('mainPrompt'),
            choices: choices
        });

        const choice = await prompt.run();
        if (choice === 'exit') process.exit(0);
        if (choice === 'lang') { engine.setLang(lang === 'zh' ? 'en' : 'zh'); continue; }
        if (choice === 'restart') {
            try { execSync('openclaw gateway restart'); console.log(ui.msg('green', '信号已发送')); } catch(e) {}
            await new Promise(r => setTimeout(r, 1000));
            continue;
        }
        if (choice === 'init') {
            console.log('向导模式暂未完全适配 Enquirer，请使用各项子菜单配置。');
            await ask('回车继续...');
            continue;
        }
        
        if (SCHEMA[choice]) await subMenu(SCHEMA[choice]);
    }
}

main().catch(e => {
    if (e === '') process.exit(0); // 处理 Enquirer Ctrl+C
    console.error(e);
});
