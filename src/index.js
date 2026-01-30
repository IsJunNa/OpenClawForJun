#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 全面优化版 - UI美化 + 更新修复 + 交互增强
 * 作者: Jun
 */

const { execSync, spawn } = require('child_process');
const readline = require('readline');
const SCHEMA = require('./config-map');
const engine = require('./config-engine');
const ui = require('./cli-ui');
const pkg = require('../package.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// --- 优雅退出处理 ---
process.on('SIGINT', () => {
    console.log(ui.msg('yellow', '\n\n👋 已退出 OpenClaw 管理中心，下次见！'));
    process.exit(0);
});

// --- 基础工具函数 ---
function simpleAsk(q) {
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

// --- Spinner 动画显示 ---
function showSpinner(message, duration = 2000) {
    return new Promise(resolve => {
        const frames = ui.spinnerFrames;
        let i = 0;
        process.stdout.write('\n');
        const interval = setInterval(() => {
            const frame = ui.colors.cyan + frames[i % frames.length] + ui.colors.reset;
            process.stdout.write(`\r${frame} ${message}`);
            i++;
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            process.stdout.write('\r' + ' '.repeat(message.length + 5) + '\r');
            resolve();
        }, duration);
    });
}

// --- 版本检查 (优化版) ---
async function checkUpdate() {
    const lang = engine.getLang();
    console.log(ui.msg('cyan', `\n${ui.icons.loading} ${ui.t('updating')}`));

    try {
        // 增加超时和重试
        const latestRaw = execSync(
            `curl -s --connect-timeout 5 --max-time 10 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?v=${Date.now()}"`,
            { encoding: 'utf8', timeout: 15000 }
        );

        const latestPkg = JSON.parse(latestRaw);

        if (isNewer(latestPkg.version, pkg.version)) {
            console.log('\n' + ui.infoBox(
                `${ui.icons.fire} ${ui.t('updateFound')}`,
                `${ui.msg('yellow', '线上版本')}: v${latestPkg.version}\n${ui.msg('gray', '本地版本')}: v${pkg.version}`,
                'warning'
            ));

            console.log(`\n  ${ui.colors.green}1.${ui.colors.reset} ${ui.icons.rocket} ${ui.t('updateNow')}`);
            console.log(`  ${ui.colors.gray}2.${ui.colors.reset} ${ui.icons.arrow} ${ui.t('updateLater')}`);

            const choice = await simpleAsk(`\n${ui.colors.cyan}👉 请输入序号: ${ui.colors.reset}`);

            if (choice === '1') {
                console.log(ui.success('\n正在执行全自动更新...'));
                await showSpinner('下载中...', 1500);

                const cmd = process.platform === 'win32'
                    ? `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))"`
                    : `curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash`;

                try {
                    execSync(cmd, { stdio: 'inherit' });
                    console.log(ui.success('\n更新完成！请重新运行 openclaw-jun'));
                } catch (e) {
                    console.log(ui.error('\n更新失败，请手动运行安装脚本'));
                }
                process.exit(0);
            } else {
                console.log(ui.msg('gray', '\n已跳过更新'));
            }
        } else {
            console.log(ui.success('当前已是最新版本'));
        }
    } catch (e) {
        console.log(ui.warning(ui.t('noNetwork')));
    }

    await sleep(500);
}

// --- 动态加载交互组件 ---
let Select, Input, Toggle;
try {
    const enquirer = require('enquirer');
    Select = enquirer.Select;
    Input = enquirer.Input;
    Toggle = enquirer.Toggle;
} catch (e) {
    console.log(ui.error('\n运行环境不完整 (缺失组件: enquirer)'));
    console.log(ui.warning('请重新运行安装脚本以修复环境:'));
    console.log(ui.msg('cyan', 'curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash'));
    process.exit(1);
}

// --- 业务逻辑 ---
function showHeader() {
    console.clear();
    ui.setLang(engine.getLang());
    console.log(ui.getBanner(pkg.version));
}

// --- 欢迎信息 (首次使用) ---
async function showWelcome() {
    const config = engine.read();
    if (!config._welcomed) {
        console.log('\n' + ui.infoBox(
            `${ui.icons.star} ${ui.t('welcome')}`,
            `${ui.icons.check} 使用数字键快速选择菜单项\n${ui.icons.check} 按 Ctrl+C 随时退出\n${ui.icons.check} 配置自动保存到 ~/.openclaw/openclaw.json`,
            'info'
        ));
        await simpleAsk(`\n${ui.colors.gray}${ui.t('enterToContinue')}${ui.colors.reset}`);
        engine.set(config, '_welcomed', true);
        engine.write(config);
    }
}

// --- 操作确认 ---
async function confirm(message) {
    const prompt = new Toggle({
        message: message,
        enabled: '确认 (Yes)',
        disabled: '取消 (No)'
    });
    return await prompt.run();
}

// --- 配置编辑 ---
async function handleEdit(config, item) {
    const lang = engine.getLang();
    const currentVal = engine.get(config, item.key);
    let newValue = '';

    // 显示配置说明
    if (item.desc) {
        console.log(ui.msg('gray', `\n${ui.icons.info} ${item.desc[lang]}`));
    }

    if (item.type === 'boolean') {
        const prompt = new Toggle({
            message: item.label[lang],
            enabled: '开启 (ON)',
            disabled: '关闭 (OFF)',
            initial: currentVal === true || currentVal === 'true'
        });
        newValue = String(await prompt.run());
    } else if (item.type === 'enum') {
        const prompt = new Select({
            message: item.label[lang],
            choices: item.options.map(opt => ({
                name: opt,
                message: opt.includes('自定义') || opt.includes('Manual') ? ui.msg('yellow', opt) : opt
            }))
        });
        const choice = await prompt.run();
        if (choice.includes('自定义') || choice.includes('Manual')) {
            const input = new Input({
                message: '请输入自定义内容:',
                initial: currentVal || ''
            });
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

    if (newValue !== '' && newValue !== currentVal) {
        if (item.isArray && !Array.isArray(newValue)) {
            newValue = [newValue];
        }
        engine.set(config, item.key, newValue);

        // 联动 Key 输入
        if (item.needsKey && newValue) {
            console.log(ui.warning(`\n${ui.icons.key} 检测到所选模型需要配对 API Key`));
            const keyPrompt = new Input({ message: `请输入对应的 API Key:` });
            const keyVal = await keyPrompt.run();
            if (keyVal) {
                const provider = newValue.split('/')[0];
                engine.set(config, 'auth.profiles.default.apiKey', keyVal);
                engine.set(config, 'auth.profiles.default.provider', provider);
                engine.set(config, 'auth.profiles.default.mode', 'api_key');
            }
        }

        engine.write(config);
        console.log(ui.success(`\n${ui.t('saveOk')}`));
        await sleep(800);
    }
}

// --- 子菜单 ---
async function subMenu(category) {
    const lang = engine.getLang();
    while (true) {
        showHeader();
        const config = engine.read();
        const choices = [];

        // 显示分类标题
        console.log(ui.msg('cyan', `\n${ui.categoryIcon(category.id)} ${category.label[lang]}\n`));
        console.log(ui.separator('─', 45));

        if (category.subCategories) {
            // 子分类菜单
            category.subCategories.forEach(sub => {
                choices.push({
                    name: sub.id,
                    message: `${ui.categoryIcon(sub.id)} ${sub.label[lang]}`
                });
            });
        } else {
            // 特殊操作 (如扫码登录)
            if (category.specialActions) {
                category.specialActions.forEach(act => {
                    choices.push({
                        name: 'act_' + act.id,
                        message: ui.msg('yellow', `${ui.icons.lightning} ${act.label[lang]}`)
                    });
                });
                choices.push({ name: 'sep1', message: ui.separator('·', 40), role: 'separator' });
            }

            // 配置项列表
            category.items.forEach((item, i) => {
                const val = engine.get(config, item.key);
                let displayVal;

                if (val === undefined || val === null || val === '') {
                    displayVal = ui.msg('red', '[未设置]');
                } else if (typeof val === 'boolean') {
                    displayVal = val ? ui.msg('green', '✓ 已开启') : ui.msg('gray', '✗ 已关闭');
                } else if (Array.isArray(val)) {
                    displayVal = ui.msg('green', `[${val.length} 项]`);
                } else {
                    const strVal = String(val);
                    displayVal = ui.msg('green', strVal.length > 25 ? strVal.substring(0, 22) + '...' : strVal);
                }

                choices.push({
                    name: String(i),
                    message: `${item.label[lang]}: ${displayVal}`
                });
            });
        }

        choices.push({ name: 'sep2', message: ui.separator('─', 40), role: 'separator' });
        choices.push({ name: 'back', message: ui.msg('magenta', `${ui.icons.arrow} ${ui.t('back')}`) });

        const prompt = new Select({
            message: ui.t('selectIdx'),
            choices: choices.filter(c => c.role !== 'separator' || choices.length < 20),
            result(value) { return value; }
        });

        try {
            const choice = await prompt.run();
            if (choice === 'back') return;

            if (category.subCategories) {
                const sub = category.subCategories.find(s => s.id === choice);
                if (sub) await subMenu(sub);
            } else if (String(choice).startsWith('act_')) {
                const actId = choice.replace('act_', '');
                const action = category.specialActions.find(a => a.id === actId);
                console.log(ui.info(`\n${ui.icons.rocket} 正在执行: ${action.command}...`));
                try {
                    execSync(action.command, { stdio: 'inherit' });
                    console.log(ui.success('\n操作执行完毕'));
                } catch (e) {
                    console.log(ui.error('\n操作执行失败'));
                }
                await simpleAsk(`\n${ui.t('enterToContinue')}`);
            } else {
                const idx = parseInt(choice);
                if (!isNaN(idx) && category.items[idx]) {
                    await handleEdit(config, category.items[idx]);
                }
            }
        } catch (e) {
            if (e === '') return;
            throw e;
        }
    }
}

// --- 帮助/关于 ---
async function showHelp() {
    showHeader();
    const lang = engine.getLang();

    console.log(ui.infoBox(
        `${ui.icons.info} 帮助与说明`,
        `${ui.icons.lobster} OpenClaw 是一个强大的 AI 助手平台
${ui.icons.check} 支持 WhatsApp/Telegram/Discord 等多个通道
${ui.icons.check} 可通过浏览器控制、定时任务实现自动化
${ui.icons.check} 配置文件位置: ~/.openclaw/openclaw.json

${ui.colors.cyan}常用命令:${ui.colors.reset}
  openclaw gateway start  - 启动网关
  openclaw status        - 查看状态
  openclaw doctor        - 诊断问题
  openclaw logs          - 查看日志

${ui.colors.cyan}项目地址:${ui.colors.reset}
  https://github.com/IsJunNa/OpenClawForJun
  https://openclaw.ai`,
        'info'
    ));

    await simpleAsk(`\n${ui.t('enterToContinue')}`);
}

// --- 主菜单 ---
async function main() {
    await checkUpdate();
    await showWelcome();

    while (true) {
        const lang = engine.getLang();
        showHeader();

        // 构建主菜单选项
        const choices = SCHEMA.map((cat, i) => ({
            name: String(i),
            message: `${ui.categoryIcon(cat.id)} ${cat.label[lang]}`
        }));

        // 分隔线
        choices.push({ name: 'sep', message: ui.separator('─', 40), role: 'separator' });

        // 系统操作
        choices.push({ name: 'lang', message: `${ui.icons.globe} ${ui.t('langSwitch')}` });
        choices.push({ name: 'restart', message: `${ui.icons.loading} ${ui.t('restart')}` });
        choices.push({ name: 'help', message: `${ui.icons.info} 帮助与说明 (Help)` });
        choices.push({ name: 'exit', message: `${ui.icons.cross} ${ui.t('exit')}` });

        const prompt = new Select({
            message: ui.t('mainPrompt'),
            choices: choices.filter(c => c.role !== 'separator')
        });

        try {
            const choice = await prompt.run();

            if (choice === 'exit') {
                console.log(ui.msg('yellow', `\n${ui.icons.lobster} 再见！感谢使用 OpenClaw 管理中心\n`));
                process.exit(0);
            }

            if (choice === 'lang') {
                engine.setLang(lang === 'zh' ? 'en' : 'zh');
                continue;
            }

            if (choice === 'restart') {
                console.log(ui.warning(`\n${ui.t('restarting')}`));
                try {
                    execSync('openclaw gateway restart', { stdio: 'inherit' });
                    console.log(ui.success(ui.t('restartOk')));
                } catch (e) {
                    console.log(ui.error('重启失败，请检查网关是否运行'));
                }
                await sleep(1500);
                continue;
            }

            if (choice === 'help') {
                await showHelp();
                continue;
            }

            const idx = parseInt(choice);
            if (!isNaN(idx) && SCHEMA[idx]) {
                await subMenu(SCHEMA[idx]);
            }
        } catch (e) {
            if (e === '') continue;
            throw e;
        }
    }
}

main().catch(e => {
    if (e === '') process.exit(0);
    console.error(ui.error('发生错误:'), e);
    process.exit(1);
});
