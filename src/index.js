#!/usr/bin/env node

/**
 * OpenClawForJun 核心程序
 * 作者: Jun
 * 声明: 本工具基于开源项目 OpenClaw (https://github.com/openclaw/openclaw)
 * 协议: 完全免费，严禁牟利
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
    console.log(ui.msg('blue', ui.banner));
    console.log(`   ${ui.msg('gray', 'Author: Jun | License: MIT | Fully Free')}`);
    console.log(ui.msg('gray', ui.separator));
}

async function handleEdit(config, item) {
    console.log(`\n${ui.msg('bold', '正在修改: ' + item.label)}`);
    console.log(`${ui.msg('gray', '说明: ' + item.desc)}`);
    
    let newValue = '';
    
    if (item.type === 'boolean') {
        console.log(`\n  1. 开启 (true)`);
        console.log(`  2. 关闭 (false)`);
        const choice = await ask('\n请选择 (1/2): ');
        if (choice === '1') newValue = 'true';
        else if (choice === '2') newValue = 'false';
    } else if (item.type === 'enum') {
        item.options.forEach((opt, i) => {
            console.log(`  ${i + 1}. ${opt}`);
        });
        const choice = await ask(`\n请选择 (1-${item.options.length}): `);
        const idx = parseInt(choice) - 1;
        if (item.options[idx]) newValue = item.options[idx];
    } else {
        newValue = await ask(`\n请输入新值 (直接回车保持不变): `);
    }

    if (newValue !== '') {
        engine.set(config, item.key, newValue);
        engine.write(config);
        console.log(ui.msg('green', '\n✅ 配置已保存。'));
        await new Promise(r => setTimeout(r, 1000));
    }
}

async function subMenu(category) {
    while (true) {
        showHeader();
        console.log(`\n${ui.msg('cyan', '【 ' + category.label + ' 】')}`);
        const config = engine.read();
        
        category.items.forEach((item, index) => {
            const val = engine.get(config, item.key);
            const displayVal = val === undefined ? ui.msg('red', '[未配置]') : ui.msg('green', val);
            console.log(`  ${ui.msg('yellow', index + 1)}. ${item.label}: ${displayVal}`);
        });
        
        console.log(`\n  ${ui.msg('magenta', 'b')}. 返回主菜单`);
        const choice = await ask(`\n👉 请输入编号进行修改: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            await handleEdit(config, category.items[idx]);
        }
    }
}

async function initWizard() {
    console.clear();
    console.log(ui.msg('yellow', ui.separator));
    console.log(ui.msg('yellow', '      OpenClaw 快速配置向导 (By Jun)      '));
    console.log(ui.msg('yellow', ui.separator));
    
    const config = engine.read();
    const essentials = [
        SCHEMA[0].items[0], // 主模型
        SCHEMA[1].items[0], // 启用 Telegram
        SCHEMA[1].items[1], // Telegram Token
    ];
    
    for (const item of essentials) {
        await handleEdit(config, item);
    }
    
    console.log(`\n${ui.msg('green', '🎊 核心配置已就绪。')}`);
    await ask('\n按回车键返回...');
}

async function main() {
    while (true) {
        showHeader();
        
        SCHEMA.forEach((cat, index) => {
            console.log(`  ${ui.msg('yellow', index + 1)}. ${ui.categoryIcon(cat.id)} ${cat.label}`);
        });
        
        console.log(ui.msg('gray', '\n' + ui.separator));
        console.log(`  ${ui.msg('cyan', '0')}. 🚀 快速初始化`);
        console.log(`  ${ui.msg('cyan', 'r')}. 🔄 重启网关`);
        console.log(`  ${ui.msg('cyan', 'q')}. 🚪 退出程序`);
        
        const choice = await ask(`\n👉 请选择分类或操作: `);
        
        if (choice.toLowerCase() === 'q') process.exit(0);
        if (choice.toLowerCase() === 'r') {
            try { 
                execSync('openclaw gateway restart'); 
                console.log(ui.msg('green', '\n✅ 重启信号已发送。')); 
            } catch(e) { 
                console.log(ui.msg('red', '\n❌ 指令执行失败。')); 
            }
            await new Promise(r => setTimeout(r, 1500));
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
