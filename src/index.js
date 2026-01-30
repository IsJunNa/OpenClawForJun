#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 优化版 - 修复逻辑问题
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

// 优雅退出
process.on('SIGINT', () => {
    console.log(ui.msg('yellow', '\n\n已退出 OpenClaw 管理中心'));
    process.exit(0);
});

// 工具函数
function ask(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isNewer(remote, local) {
    const rv = remote.split('.').map(Number);
    const lv = local.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((rv[i] || 0) > (lv[i] || 0)) return true;
        if ((rv[i] || 0) < (lv[i] || 0)) return false;
    }
    return false;
}

// 版本检查
async function checkUpdate() {
    console.log(ui.info('正在检查更新...'));

    try {
        const latestRaw = execSync(
            `curl -s --connect-timeout 5 --max-time 10 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?v=${Date.now()}"`,
            { encoding: 'utf8', timeout: 15000 }
        );

        const latestPkg = JSON.parse(latestRaw);

        if (isNewer(latestPkg.version, pkg.version)) {
            console.log(ui.warning(`发现新版本: v${latestPkg.version} (当前: v${pkg.version})`));
            console.log(`\n  1. 立即更新`);
            console.log(`  2. 跳过\n`);

            const choice = await ask('请选择 [1/2]: ');

            if (choice === '1') {
                console.log(ui.info('正在更新...'));
                const cmd = process.platform === 'win32'
                    ? `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))"`
                    : `curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash`;

                try {
                    execSync(cmd, { stdio: 'inherit' });
                    console.log(ui.success('更新完成，请重新运行'));
                } catch (e) {
                    console.log(ui.error('更新失败'));
                }
                process.exit(0);
            }
        } else {
            console.log(ui.success('已是最新版本'));
        }
    } catch (e) {
        console.log(ui.warning('无法检查更新，跳过'));
    }

    await sleep(500);
}

// 加载 enquirer
let Select, Input, Toggle;
try {
    const enquirer = require('enquirer');
    Select = enquirer.Select;
    Input = enquirer.Input;
    Toggle = enquirer.Toggle;
} catch (e) {
    console.log(ui.error('缺失 enquirer 组件，请重新安装'));
    process.exit(1);
}

// 显示头部
function showHeader() {
    console.clear();
    ui.setLang(engine.getLang());
    console.log(ui.getBanner(pkg.version));
}

// 配置编辑
async function handleEdit(config, item) {
    const lang = engine.getLang();
    const currentVal = engine.get(config, item.key);
    let newValue = '';

    if (item.desc) {
        console.log(ui.msg('gray', `\n${ui.icons.info} ${item.desc[lang]}`));
    }

    try {
        if (item.type === 'boolean') {
            const prompt = new Toggle({
                message: item.label[lang],
                enabled: 'ON',
                disabled: 'OFF',
                initial: currentVal === true || currentVal === 'true'
            });
            newValue = String(await prompt.run());
        } else if (item.type === 'enum') {
            const prompt = new Select({
                message: item.label[lang],
                choices: item.options
            });
            const choice = await prompt.run();
            if (choice.includes('自定义') || choice.includes('Manual')) {
                const input = new Input({ message: '输入值:', initial: currentVal || '' });
                newValue = await input.run();
            } else {
                newValue = choice;
            }
        } else {
            const prompt = new Input({
                message: item.label[lang],
                initial: currentVal || ''
            });
            newValue = await prompt.run();
        }
    } catch (e) {
        return; // 用户取消
    }

    if (newValue !== '' && newValue !== String(currentVal)) {
        if (item.isArray && !Array.isArray(newValue)) {
            newValue = [newValue];
        }
        engine.set(config, item.key, newValue);
        engine.write(config);
        console.log(ui.success(ui.t('saveOk')));
        await sleep(600);
    }
}

// 子菜单
async function subMenu(category) {
    const lang = engine.getLang();

    while (true) {
        showHeader();
        const config = engine.read();
        const choices = [];

        console.log(`\n${ui.categoryIcon(category.id)} ${ui.colors.bold}${category.label[lang]}${ui.colors.reset}\n`);
        console.log(ui.separator());

        if (category.subCategories) {
            category.subCategories.forEach(sub => {
                choices.push({ name: sub.id, message: `${ui.categoryIcon(sub.id)} ${sub.label[lang]}` });
            });
        } else {
            if (category.specialActions) {
                category.specialActions.forEach(act => {
                    choices.push({ name: 'act_' + act.id, message: ui.msg('yellow', `>> ${act.label[lang]}`) });
                });
            }

            category.items.forEach((item, i) => {
                const val = engine.get(config, item.key);
                let display;

                if (val === undefined || val === null || val === '') {
                    display = ui.msg('red', '[未设置]');
                } else if (typeof val === 'boolean') {
                    display = val ? ui.msg('green', 'ON') : ui.msg('gray', 'OFF');
                } else if (Array.isArray(val)) {
                    display = ui.msg('green', `[${val.length}项]`);
                } else {
                    const str = String(val);
                    display = ui.msg('green', str.length > 20 ? str.slice(0, 17) + '...' : str);
                }

                choices.push({ name: String(i), message: `${item.label[lang]}: ${display}` });
            });
        }

        choices.push({ name: 'back', message: ui.msg('magenta', `<- ${ui.t('back')}`) });

        try {
            const prompt = new Select({
                message: '选择操作',
                choices: choices
            });

            const choice = await prompt.run();

            if (choice === 'back') return;

            if (category.subCategories) {
                const sub = category.subCategories.find(s => s.id === choice);
                if (sub) await subMenu(sub);
            } else if (String(choice).startsWith('act_')) {
                const actId = choice.replace('act_', '');
                const action = category.specialActions.find(a => a.id === actId);
                console.log(ui.info(`执行: ${action.command}...`));
                try {
                    execSync(action.command, { stdio: 'inherit' });
                    console.log(ui.success('完成'));
                } catch (e) {
                    console.log(ui.error('执行失败'));
                }
                await ask('\n按 Enter 继续...');
            } else {
                const idx = parseInt(choice);
                if (!isNaN(idx) && category.items[idx]) {
                    await handleEdit(config, category.items[idx]);
                }
            }
        } catch (e) {
            if (e === '') return;
        }
    }
}

// 主菜单
async function main() {
    await checkUpdate();

    while (true) {
        const lang = engine.getLang();
        showHeader();

        const choices = SCHEMA.map((cat, i) => ({
            name: String(i),
            message: `${ui.categoryIcon(cat.id)} ${cat.label[lang]}`
        }));

        choices.push({ name: 'lang', message: `[Lang] ${ui.t('langSwitch')}` });
        choices.push({ name: 'restart', message: `[Srv] ${ui.t('restart')}` });
        choices.push({ name: 'exit', message: `[Exit] ${ui.t('exit')}` });

        try {
            const prompt = new Select({
                message: ui.t('mainPrompt'),
                choices: choices
            });

            const choice = await prompt.run();

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
                await sleep(1000);
                continue;
            }

            const idx = parseInt(choice);
            if (!isNaN(idx) && SCHEMA[idx]) {
                await subMenu(SCHEMA[idx]);
            }
        } catch (e) {
            if (e === '') continue;
        }
    }
}

main().catch(e => {
    if (e === '') process.exit(0);
    console.error(ui.error('错误:'), e);
    process.exit(1);
});
