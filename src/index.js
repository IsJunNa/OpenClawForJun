#!/usr/bin/env node

/**
 * OpenClawForJun 核心入口
 * 作者: Jun
 * 基于 OpenClaw (Clawd) 原生项目构建
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
    console.log(`   ${ui.msg('yellow', '作者: Jun | 版本: 1.0.0 | 本工具完全免费')} `);
    console.log(ui.msg('green', ui.separator));
}

async function subMenu(category) {
    while (true) {
        showHeader();
        console.log(`\n${ui.categoryIcon(category.id)} ${ui.msg('blue', '【' + category.label + '】')}`);
        const config = engine.read();
        
        category.items.forEach((item, index) => {
            const val = engine.get(config, item.key);
            const displayVal = val === undefined ? ui.msg('red', '[未设置]') : ui.msg('green', val);
            console.log(`  ${ui.msg('yellow', index + 1)}. ${item.label}: ${displayVal}`);
            console.log(`     ${ui.msg('reset', '└─ ' + item.desc)}`);
        });
        
        console.log(`\n  ${ui.msg('cyan', 'b')}. 返回主菜单`);
        const choice = await ask(`\n👉 请输入编号进行修改: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            const item = category.items[idx];
            console.log(`\n📦 ${ui.msg('bold', '正在修改: ' + item.label)}`);
            console.log(`💡 ${ui.msg('yellow', '说明: ' + item.desc)}`);
            const newVal = await ask(`✍️ 请输入新值 (直接回车保持不变): `);
            if (newVal.trim() !== '') {
                engine.set(config, item.key, newVal.trim());
                engine.write(config);
                console.log(ui.msg('green', '\n✅ 保存成功！'));
                await new Promise(r => setTimeout(r, 800));
            }
        }
    }
}

async function initWizard() {
    console.clear();
    console.log(ui.msg('yellow', '=========================================='));
    console.log(ui.msg('yellow', '   🚀 OpenClaw 中文初始化向导 (By Jun)    '));
    console.log(ui.msg('yellow', '=========================================='));
    console.log(`\n奴才将带您完成核心设置，让助手立刻上线。`);
    
    const config = engine.read();
    const essentials = [
        SCHEMA[0].items[0], // 主模型
        SCHEMA[1].items[0], // 启用 Telegram
        SCHEMA[1].items[1], // Telegram Token
    ];
    
    for (const item of essentials) {
        const current = engine.get(config, item.key);
        const res = await ask(`\n📍 ${item.label}\n   ${ui.msg('reset', item.desc)}\n   [当前: ${current || '空'}] ->: `);
        if (res.trim() !== '') {
            engine.set(config, item.key, res.trim());
        }
    }
    
    engine.write(config);
    console.log(`\n${ui.msg('green', '🎊 核心配置已就绪！去主菜单重启网关即可。')}`);
    await ask('\n按回车键返回...');
}

async function main() {
    while (true) {
        showHeader();
        console.log(`\n🚀 本工具由作者 ${ui.msg('bold', 'Jun')} 为开源项目 ${ui.msg('blue', 'OpenClaw')} 定制开发。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`  ${ui.msg('yellow', index + 1)}. ${ui.categoryIcon(cat.id)} ${cat.label}`);
        });
        
        console.log(`\n  ${ui.msg('cyan', '0')}. 🌟 开始「中文初始化向导」`);
        console.log(`  ${ui.msg('cyan', 'r')}. 🔄 重启网关 (改完配置必点)`);
        console.log(`  ${ui.msg('cyan', 'q')}. 🚪 退出管理`);
        
        const choice = await ask(`\n👉 请选择操作: `);
        
        if (choice.toLowerCase() === 'q') {
            console.log('\n👋 愿代码无 Bug，OpenClaw 与您同在。');
            process.exit(0);
        }
        
        if (choice.toLowerCase() === 'r') {
            console.log(`\n${ui.msg('yellow', '正在发送重启信号...')}`);
            try { 
                execSync('openclaw gateway restart'); 
                console.log(ui.msg('green', '✅ 重启指令已送达。')); 
            } catch(e) { 
                console.log(ui.msg('red', '❌ 重启失败，请尝试手动运行 openclaw gateway restart')); 
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
