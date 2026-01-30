#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 交互优化版
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

// 优雅退出
process.on('SIGINT', () => {
    console.log(ui.msg('yellow', '\n\n再见！'));
    process.exit(0);
});

// 工具
function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function isNewer(r, l) {
    const rv = r.split('.').map(Number);
    const lv = l.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((rv[i] || 0) > (lv[i] || 0)) return true;
        if ((rv[i] || 0) < (lv[i] || 0)) return false;
    }
    return false;
}

// 版本检查
async function checkUpdate() {
    console.log(ui.info('检查更新...'));
    try {
        const raw = execSync(
            `curl -s --connect-timeout 3 --max-time 8 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?t=${Date.now()}"`,
            { encoding: 'utf8', timeout: 10000 }
        );
        const remote = JSON.parse(raw);
        if (isNewer(remote.version, pkg.version)) {
            console.log(ui.warning(`新版本 v${remote.version} 可用 (当前 v${pkg.version})`));
            console.log(`  1) 更新  2) 跳过`);
            const c = await ask('选择: ');
            if (c === '1') {
                const cmd = process.platform === 'win32'
                    ? `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))"`
                    : `curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash`;
                execSync(cmd, { stdio: 'inherit' });
                process.exit(0);
            }
        } else {
            console.log(ui.success('已是最新'));
        }
    } catch (e) {
        console.log(ui.msg('gray', '跳过更新检查'));
    }
    await sleep(300);
}

// enquirer
let Select, Input, Toggle;
try {
    const eq = require('enquirer');
    Select = eq.Select;
    Input = eq.Input;
    Toggle = eq.Toggle;
} catch (e) {
    console.log(ui.error('缺少 enquirer，请重新安装'));
    process.exit(1);
}

// 头部
function showHeader() {
    console.clear();
    ui.setLang(engine.getLang());
    console.log(ui.getHeader(pkg.version));
}

// 编辑配置
async function editConfig(config, item) {
    const lang = engine.getLang();
    const current = engine.get(config, item.key);

    // 显示配置说明
    if (item.desc) {
        console.log(ui.showConfigInfo(item.label[lang], item.desc[lang]));
    }

    let newVal;
    try {
        if (item.type === 'boolean') {
            const p = new Toggle({
                message: item.label[lang],
                enabled: '开启',
                disabled: '关闭',
                initial: current === true
            });
            newVal = await p.run();
        } else if (item.type === 'enum') {
            const p = new Select({
                message: item.label[lang],
                choices: item.options
            });
            const choice = await p.run();
            if (choice === '自定义') {
                const inp = new Input({ message: '输入值:', initial: current || '' });
                newVal = await inp.run();
            } else {
                newVal = choice;
            }
        } else {
            const p = new Input({
                message: item.label[lang],
                initial: current || ''
            });
            newVal = await p.run();
        }
    } catch (e) {
        return; // 取消
    }

    if (newVal !== undefined && newVal !== current) {
        if (item.isArray && !Array.isArray(newVal)) {
            newVal = newVal ? [newVal] : [];
        }
        engine.set(config, item.key, newVal);

        // 选择模型后提示输入 API Key
        if (item.key.includes('model.primary') && newVal && newVal.includes('/')) {
            const provider = newVal.split('/')[0];
            console.log(ui.info(`模型 ${newVal} 需要 API Key`));
            try {
                const keyPrompt = new Input({ message: `请输入 ${provider} API Key:` });
                const apiKey = await keyPrompt.run();
                if (apiKey) {
                    engine.set(config, 'auth.profiles.default.apiKey', apiKey);
                    engine.set(config, 'auth.profiles.default.provider', provider);
                    console.log(ui.success('API Key 已保存'));
                }
            } catch (e) {
                // 用户取消
            }
        }

        engine.write(config);
        console.log(ui.success(ui.t('saveOk')));
        await sleep(400);
    }
}

// 子菜单
async function subMenu(cat) {
    const lang = engine.getLang();
    ui.pushPath(cat.label[lang]);

    try {
        while (true) {
            showHeader();
            const config = engine.read();
            const choices = [];

            // 分类描述
            const style = ui.categoryStyle(cat.id);
            if (style.desc[lang]) {
                console.log(ui.msg('gray', `  ${style.desc[lang]}`));
            }
            console.log('');

            if (cat.subCategories) {
                // 子分类列表
                cat.subCategories.forEach(sub => {
                    const subStyle = ui.categoryStyle(sub.id);
                    choices.push({
                        name: sub.id,
                        message: ui.formatCategory(sub.id, sub.label[lang]),
                        hint: subStyle.desc[lang]
                    });
                });
            } else {
                // 特殊操作
                if (cat.specialActions) {
                    console.log(ui.msg('yellow', '  ▸ 快捷操作'));
                    cat.specialActions.forEach(act => {
                        choices.push({
                            name: 'act_' + act.id,
                            message: `  ${ui.colors.yellow}▶${ui.colors.reset} ${act.label[lang]}`,
                            hint: act.command
                        });
                    });
                    choices.push({ name: '_sep', message: ui.separator(40), role: 'separator' });
                    console.log(ui.msg('cyan', '  ▸ 配置项'));
                }

                // 配置项列表
                cat.items.forEach((item, i) => {
                    const val = engine.get(config, item.key);
                    const display = ui.formatValue(val, item);
                    choices.push({
                        name: String(i),
                        message: `  ${item.label[lang]}`,
                        hint: display
                    });
                });
            }

            choices.push({ name: '_sep2', message: '', role: 'separator' });

            const prompt = new Select({
                message: '选择',
                choices: choices.filter(c => c.role !== 'separator')
            });

            let choice;
            try {
                choice = await prompt.run();
            } catch (e) {
                break;
            }

            if (choice === 'back') break;

            if (cat.subCategories) {
                const sub = cat.subCategories.find(s => s.id === choice);
                if (sub) await subMenu(sub);
            } else if (choice.startsWith('act_')) {
                const act = cat.specialActions.find(a => a.id === choice.replace('act_', ''));
                if (act) {
                    console.log(ui.info(`执行: ${act.command}`));
                    try {
                        execSync(act.command, { stdio: 'inherit' });
                        console.log(ui.success('完成'));
                    } catch (e) {
                        console.log(ui.error('失败'));
                    }
                    await ask(ui.t('enterToContinue'));
                }
            } else {
                const idx = parseInt(choice);
                if (!isNaN(idx) && cat.items[idx]) {
                    await editConfig(config, cat.items[idx]);
                }
            }
        }
    } finally {
        ui.popPath();
    }
}

// 主菜单
async function main() {
    await checkUpdate();
    ui.clearPath();

    while (true) {
        const lang = engine.getLang();
        showHeader();

        console.log(ui.msg('gray', '  选择要配置的功能模块\n'));

        const choices = SCHEMA.map((cat, i) => {
            const style = ui.categoryStyle(cat.id);
            return {
                name: String(i),
                message: ui.formatCategory(cat.id, cat.label[lang]),
                hint: style.desc[lang]
            };
        });

        choices.push({ name: '_sep', message: '', role: 'separator' });
        choices.push({ name: 'lang', message: `🌐 ${ui.t('langSwitch')}` });
        choices.push({ name: 'restart', message: `🔄 ${ui.t('restart')}` });
        choices.push({ name: 'exit', message: `✕ ${ui.t('exit')}` });

        let choice;
        try {
            const prompt = new Select({
                message: ui.t('mainPrompt'),
                choices: choices.filter(c => c.role !== 'separator')
            });
            choice = await prompt.run();
        } catch (e) {
            continue;
        }

        if (choice === 'exit') {
            console.log(ui.msg('yellow', '\n再见！\n'));
            process.exit(0);
        }

        if (choice === 'lang') {
            engine.setLang(lang === 'zh' ? 'en' : 'zh');
            continue;
        }

        if (choice === 'restart') {
            console.log(ui.info(ui.t('restarting')));
            try {
                execSync('openclaw gateway restart', { stdio: 'inherit' });
                console.log(ui.success(ui.t('restartOk')));
            } catch (e) {
                console.log(ui.error('失败'));
            }
            await sleep(800);
            continue;
        }

        const idx = parseInt(choice);
        if (!isNaN(idx) && SCHEMA[idx]) {
            await subMenu(SCHEMA[idx]);
        }
    }
}

main().catch(e => {
    if (e === '') process.exit(0);
    console.error(e);
    process.exit(1);
});
