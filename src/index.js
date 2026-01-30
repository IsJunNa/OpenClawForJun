#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 作者: Jun
 */

const readline = require('readline');
const { execSync, exec } = require('child_process');
const SCHEMA = require('./config-map');
const engine = require('./config-engine');
const ui = require('./cli-ui');
const pkg = require('../package.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function checkUpdate() {
    const lang = engine.getLang();
    try {
        // 使用随机数作为参数强制绕过 GitHub 缓存
        const latestRaw = execSync(`curl -s --connect-timeout 3 "https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/package.json?v=${Date.now()}"`).toString();
        const latestPkg = JSON.parse(latestRaw);
        
        // 只有当远程版本号大于本地版本号时才提示更新
        if (isNewer(latestPkg.version, pkg.version)) {
            console.log(ui.msg('yellow', `\n🔔 检测到新版本: v${latestPkg.version} (当前本地版本: v${pkg.version})`));
            console.log(`  1. 立即更新`);
            console.log(`  2. 暂时忽略`);
            
            const choice = await ask(`\n👉 ${ui.t('selectIdx')}: `);
            if (choice === '1') {
                console.log(ui.msg('green', '\n正在启动全自动更新程序...'));
                const cmd = process.platform === 'win32' 
                    ? `powershell -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))"`
                    : `curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash`;
                
                try {
                    execSync(cmd, { stdio: 'inherit' });
                    console.log(ui.msg('green', '\n✅ 更新完成！请重新启动工具。'));
                    process.exit(0);
                } catch (e) {
                    console.log(ui.msg('red', '\n❌ 更新失败，请尝试手动运行安装脚本。'));
                }
            }
        }
    } catch (e) {
        // 忽略网络异常
    }
}

function isNewer(remote, local) {
    const r = remote.split('.').map(Number);
    const l = local.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if (r[i] > l[i]) return true;
        if (r[i] < l[i]) return false;
    }
    return false;
}

async function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

function showHeader() {
    console.clear();
    ui.setLang(engine.getLang());
    console.log(ui.getBanner(pkg.version));
    console.log(ui.msg('gray', ui.separator));
}

async function handleEdit(config, item) {
    const lang = engine.getLang();
    console.log(`\n${ui.msg('bold', (lang === 'zh' ? '正在设置: ' : 'Setting: ') + item.label[lang])}`);
    console.log(`${ui.msg('yellow', '💡 ' + item.desc[lang])}`);
    
    let newValue = '';
    
    if (item.type === 'boolean') {
        console.log(`\n  1. ${lang === 'zh' ? '开启 (true)' : 'Enable (true)'}`);
        console.log(`  2. ${lang === 'zh' ? '关闭 (false)' : 'Disable (false)'}`);
        const choice = await ask(`\n${ui.t('selectIdx')}: `);
        if (choice === '1') newValue = 'true';
        else if (choice === '2') newValue = 'false';
    } else if (item.type === 'enum') {
        item.options.forEach((opt, i) => {
            console.log(`  ${i + 1}. ${opt}`);
        });
        const choice = await ask(`\n${ui.t('selectIdx')} (1-${item.options.length}): `);
        const idx = parseInt(choice) - 1;
        if (item.options[idx]) {
            if (item.options[idx].includes('自定义') || item.options[idx].includes('Manual')) {
                newValue = await ask(`\n${lang === 'zh' ? '请输入内容' : 'Input value'}: `);
            } else {
                newValue = item.options[idx];
            }
        }
    } else {
        newValue = await ask(`\n${ui.t('newValue')}: `);
    }

    if (newValue !== '') {
        // 特殊处理数组 (备份模型)
        if (item.isArray) {
            newValue = [newValue];
        }
        engine.set(config, item.key, newValue);
        engine.write(config);
        console.log(ui.msg('green', `\n${ui.t('saveOk')}`));
        await new Promise(r => setTimeout(r, 800));
    }
}

async function subMenu(category) {
    const lang = engine.getLang();
    while (true) {
        showHeader();
        
        // 分支：是直接项列表，还是子目录列表？
        if (category.subCategories) {
            console.log(`\n${ui.msg('cyan', '【 ' + category.label[lang] + ' 】')}`);
            category.subCategories.forEach((sub, index) => {
                console.log(`  ${ui.msg('yellow', index + 1)}. ${sub.label[lang]}`);
            });
            console.log(`\n  ${ui.msg('magenta', 'b')}. ${ui.t('back')}`);
            const choice = await ask(`\n👉 ${ui.t('mainPrompt')}: `);
            if (choice.toLowerCase() === 'b') return;
            const idx = parseInt(choice) - 1;
            if (category.subCategories[idx]) await subMenu(category.subCategories[idx]);
        } else {
            console.log(`\n${ui.msg('cyan', '【 ' + category.label[lang] + ' 】')}`);
            const config = engine.read();
            category.items.forEach((item, index) => {
                let val = engine.get(config, item.key);
                if (item.isArray && Array.isArray(val)) val = val[0];
                const displayVal = val === undefined ? ui.msg('red', `[${ui.t('none')}]`) : ui.msg('green', val);
                console.log(`  ${ui.msg('yellow', index + 1)}. ${item.label[lang]}: ${displayVal}`);
            });
            console.log(`\n  ${ui.msg('magenta', 'b')}. ${ui.t('back')}`);
            const choice = await ask(`\n👉 ${ui.t('editPrompt')}: `);
            if (choice.toLowerCase() === 'b') return;
            const idx = parseInt(choice) - 1;
            if (category.items[idx]) await handleEdit(config, category.items[idx]);
        }
    }
}

async function main() {
    // 启动前检查更新
    await checkUpdate();

    while (true) {
        const lang = engine.getLang();
        showHeader();
        
        SCHEMA.forEach((cat, index) => {
            console.log(`  ${ui.msg('yellow', index + 1)}. ${ui.categoryIcon(cat.id)} ${cat.label[lang]}`);
        });
        
        console.log(ui.msg('gray', '\n' + ui.separator));
        console.log(`  ${ui.msg('cyan', '0')}. 🚀 ${ui.t('init')}`);
        console.log(`  ${ui.msg('cyan', 'l')}. 🌐 ${ui.t('langSwitch')}`);
        console.log(`  ${ui.msg('cyan', 'r')}. 🔄 ${ui.t('restart')}`);
        console.log(`  ${ui.msg('cyan', 'q')}. 🚪 ${ui.t('exit')}`);
        
        const choice = await ask(`\n👉 ${ui.t('mainPrompt')}: `);
        
        if (choice.toLowerCase() === 'q') process.exit(0);
        if (choice.toLowerCase() === 'l') {
            engine.setLang(lang === 'zh' ? 'en' : 'zh');
            continue;
        }
        if (choice.toLowerCase() === 'r') {
            console.log(`\n${ui.msg('yellow', ui.t('restarting'))}`);
            try { 
                execSync('openclaw gateway restart'); 
                console.log(ui.msg('green', ui.t('restartOk'))); 
            } catch(e) { 
                console.log(ui.msg('red', '\n❌ ' + (lang === 'zh' ? '重启失败' : 'Restart Failed')));
                console.log(ui.msg('yellow', lang === 'zh' ? '常见原因：' : 'Common Reasons:'));
                console.log(lang === 'zh' ? '1. OpenClaw 未运行' : '1. OpenClaw not running');
                console.log(lang === 'zh' ? '2. 权限不足' : '2. Insufficient permissions');
            }
            await new Promise(r => setTimeout(r, 2000));
            continue;
        }
        
        if (choice === '0') {
            const config = engine.read();
            await handleEdit(config, SCHEMA[0].items[0]); // Primary Model
            await handleEdit(config, SCHEMA[1].subCategories[0].items[0]); // Enable TG Plugin
            await handleEdit(config, SCHEMA[1].subCategories[0].items[2]); // TG Token
            continue;
        }
        
        const idx = parseInt(choice) - 1;
        if (SCHEMA[idx]) {
            await subMenu(SCHEMA[idx]);
        }
    }
}

main();
