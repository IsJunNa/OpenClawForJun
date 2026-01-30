#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 作者: Jun
 * 基于 OpenClaw 原生项目构建
 */

const readline = require('readline');
const { execSync } = require('child_process');
const SCHEMA = require('./config-map');
const engine = require('./config-engine');
const ui = require('./cli-ui');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

function showHeader() {
    console.clear();
    console.log(ui.msg('cyan', ui.banner));
    console.log(ui.msg('green', ui.separator));
    console.log(`   🦆 ${ui.msg('bold', 'OpenClawForJun')} 智能管理中心 `);
    console.log(`   ${ui.msg('yellow', '作者: Jun | 此工具完全免费 | MIT 协议')} `);
    console.log(ui.msg('green', ui.separator));
}

async function subMenu(category) {
    while (true) {
        showHeader();
        console.log(`\n${ui.msg('blue', '【' + category.label + '】')}`);
        const config = engine.read();
        
        category.items.forEach((item, index) => {
            const val = engine.get(config, item.key);
            const displayVal = val === undefined ? ui.msg('red', '[未设置]') : ui.msg('green', val);
            console.log(`${ui.msg('yellow', index + 1)}. ${item.label}: ${displayVal}`);
            console.log(`   └─ ${item.desc}`);
        });
        
        console.log(`\n${ui.msg('cyan', 'b')}. 返回主菜单`);
        const choice = await ask(`\n请输入编号进行修改: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            const item = category.items[idx];
            console.log(`\n${ui.msg('bold', '正在修改: ' + item.label)}`);
            console.log(`${ui.msg('yellow', '提示: ' + item.desc)}`);
            const newVal = await ask(`请输入新值 (直接回车保持不变): `);
            if (newVal.trim() !== '') {
                engine.set(config, item.key, newVal.trim());
                engine.write(config);
                console.log(ui.msg('green', '✅ 保存成功！'));
                await new Promise(r => setTimeout(r, 800));
            }
        }
    }
}

async function initWizard() {
    console.clear();
    console.log(ui.msg('yellow', '--- 🚀 OpenClaw 中文初始化向导 ---'));
    console.log(`由 Jun 倾力打造，引导您完成核心配置。`);
    
    const config = engine.read();
    const essentials = [
        SCHEMA[0].items[0], // 主模型
        SCHEMA[1].items[0], // 启用 Telegram
        SCHEMA[1].items[1], // Telegram Token
    ];
    
    for (const item of essentials) {
        const current = engine.get(config, item.key);
        const res = await ask(`\n${item.label} (${item.desc})\n[当前: ${current || '空'}] -> 请输入: `);
        if (res.trim() !== '') {
            engine.set(config, item.key, res.trim());
        }
    }
    
    engine.write(config);
    console.log(`\n${ui.msg('green', '🎉 核心配置已就绪！')}`);
    await ask('按回车返回主菜单...');
}

async function main() {
    while (true) {
        showHeader();
        console.log(`\n本项目基于开源项目 ${ui.msg('blue', 'OpenClaw (原 Clawd)')}。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`${ui.msg('yellow', index + 1)}. ${cat.label}`);
        });
        
        console.log(`\n${ui.msg('cyan', '0')}. 🚀 开始「中文初始化向导」`);
        console.log(`${ui.msg('cyan', 'r')}. 🔄 重启网关 (使新配置生效)`);
        console.log(`${ui.msg('cyan', 'q')}. 🚪 退出工具`);
        
        const choice = await ask(`\n请选择操作: `);
        
        if (choice.toLowerCase() === 'q') {
            console.log('愿 OpenClaw 与您同在。');
            process.exit(0);
        }
        
        if (choice.toLowerCase() === 'r') {
            console.log(ui.msg('yellow', '正在发送重启指令...'));
            try { 
                execSync('openclaw gateway restart'); 
                console.log('✅ 指令已发送。'); 
            } catch(e) { 
                console.log('❌ 重启失败，请手动运行 openclaw gateway restart'); 
            }
            await new Promise(r => setTimeout(r, 2000));
            continue;
        }
        
        if (choice === '0') {
            await initWizard();
            continue;
        }
        
        const idx = parseInt(choice) - 1;
        if (SCHEMA[idx]) {
            await subMenu(SCHEMA[idx]);
        }
    }
}

main();
