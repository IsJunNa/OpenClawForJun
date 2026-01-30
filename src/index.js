#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 作者: Jun
 */

const { execSync } = require('child_process');
const readline = require('readline');
const SCHEMA = require('./config-map');
const engine = require('./config-engine');
const ui = require('./cli-ui');
const pkg = require('../package.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- 基础工具函数 ---
function simpleAsk(q) {
    return new Promise(resolve => rl.question(q, resolve));
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

// --- 版本检查 (不依赖外部库) ---
async function checkUpdate() {
    try {
        const latestRaw = execSync(`curl -s --connect-timeout 2 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?v=${Date.now()}"`).toString();
        const latestPkg = JSON.parse(latestRaw);
        if (isNewer(latestPkg.version, pkg.version)) {
            console.log(ui.msg('yellow', `\n🔔 检测到新版本: v${latestPkg.version} (当前本地: v${pkg.version})`));
            console.log(`  1. 立即更新 (推荐)`);
            console.log(`  2. 暂时忽略`);
            const choice = await simpleAsk(`\n👉 请输入序号: `);
            if (choice === '1') {
                console.log(ui.msg('green', '\n正在执行全自动更新...'));
                const cmd = process.platform === 'win32' 
                    ? `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))"`
                    : `curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash`;
                execSync(cmd, { stdio: 'inherit' });
                process.exit(0);
            }
        }
    } catch (e) {}
}

// --- 动态加载交互组件 ---
let Select, Input, Toggle;
try {
    const enquirer = require('enquirer');
    Select = enquirer.Select;
    Input = enquirer.Input;
    Toggle = enquirer.Toggle;
} catch (e) {
    console.log(ui.msg('red', '\n❌ 运行环境不完整 (缺失组件: enquirer)'));
    console.log(ui.msg('yellow', '请重新运行安装脚本以修复环境:'));
    console.log(ui.msg('cyan', 'curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash'));
    process.exit(1);
}

// --- 业务逻辑 ---
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
            const input = new Input({ message: '请输入自定义内容:' });
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
        
        // 联动 Key 输入
        if (item.needsKey) {
            console.log(ui.msg('yellow', `\n🔑 检测到所选模型需要配对 API Key`));
            const keyPrompt = new Input({ message: `请输入对应的 API Key:` });
            const keyVal = await keyPrompt.run();
            if (keyVal) {
                // 暂时保存在默认路径，后续可根据 schema 扩展
                engine.set(config, 'auth.profiles.default.apiKey', keyVal);
                engine.set(config, 'auth.profiles.default.provider', newValue.split('/')[0]);
                engine.set(config, 'auth.profiles.default.mode', 'api_key');
            }
        }
        
        engine.write(config);
        console.log(ui.msg('green', `\n✅ 配置已保存`));
        await new Promise(r => setTimeout(r, 800));
    }
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
                category.specialActions.forEach(act => choices.push({ name: 'act_' + act.id, message: ui.msg('yellow', '⚡ ' + act.label[lang]) }));
            }
            category.items.forEach((item, i) => {
                const val = engine.get(config, item.key);
                choices.push({ name: i, message: `${item.label[lang]}: ${val === undefined ? ui.msg('red', '[未设置]') : ui.msg('green', val)}` });
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
            try { execSync(action.command, { stdio: 'inherit' }); } catch(e) {}
            await simpleAsk('\n操作执行完毕，按回车返回...');
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
            console.log(ui.msg('yellow', `\n${ui.t('restarting')}`));
            try { execSync('openclaw gateway restart'); console.log(ui.msg('green', ui.t('restartOk'))); } 
            catch(e) { console.log(ui.msg('red', 'ERROR')); }
            await new Promise(r => setTimeout(r, 1500));
            continue;
        }
        
        if (SCHEMA[choice]) await subMenu(SCHEMA[choice]);
    }
}

main().catch(e => {
    if (e === '') process.exit(0);
    console.error(e);
});
