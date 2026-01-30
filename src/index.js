#!/usr/bin/env node

/**
 * OpenClawForJun 核心程序
 * 作者: Jun
 * 基于开源项目 OpenClaw (https://github.com/openclaw/openclaw)
 * 本工具遵循 MIT 协议，完全免费。
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
    console.log(`   ${ui.msg('gray', 'Author: Jun | License: MIT | Fully Free & Professional')}`);
    console.log(ui.msg('gray', ui.separator));
}

async function handleEdit(config, item) {
    console.log(`\n${ui.msg('bold', '正在修改: ' + item.label)}`);
    console.log(`${ui.msg('gray', '说明: ' + item.desc)}`);
    
    let newValue = '';
    
    if (item.type === 'boolean') {
        console.log(`\n  1. 开启 (true)`);
        console.log(`  2. 关闭 (false)`);
        const choice = await ask('\n请选择序号: ');
        if (choice === '1') newValue = 'true';
        else if (choice === '2') newValue = 'false';
    } else if (item.type === 'enum') {
        item.options.forEach((opt, i) => {
            console.log(`  ${i + 1}. ${opt}`);
        });
        const choice = await ask(`\n请选择序号 (1-${item.options.length}): `);
        const idx = parseInt(choice) - 1;
        if (item.options[idx]) {
            if (item.options[idx] === '自定义输入') {
                newValue = await ask(`\n请输入自定义内容: `);
            } else {
                newValue = item.options[idx];
            }
        }
    } else {
        newValue = await ask(`\n请输入新值 (直接回车保持不变): `);
    }

    if (newValue !== '') {
        engine.set(config, item.key, newValue);
        engine.write(config);
        console.log(ui.msg('green', '\n✅ 配置已成功保存。'));
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
            const displayVal = val === undefined ? ui.msg('red', '[尚未配置]') : ui.msg('green', val);
            console.log(`  ${ui.msg('yellow', index + 1)}. ${item.label}: ${displayVal}`);
        });
        
        console.log(`\n  ${ui.msg('magenta', 'b')}. 返回主菜单`);
        const choice = await ask(`\n👉 请选择要修改的项目编号: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            await handleEdit(config, category.items[idx]);
        }
    }
}

async function initWizard() {
    console.clear();
    showHeader();
    console.log(ui.msg('yellow', '\n--- ⚙️ OpenClaw 快速配置向导 ---'));
    console.log(`本向导将协助您快速完成系统的核心初始化。`);
    
    const config = engine.read();
    // 定义初始化必须的几项
    const essentials = [
        SCHEMA[0].items[0], // 主模型
        SCHEMA[1].items[0], // 开启 Telegram
        SCHEMA[1].items[1], // Telegram Token
    ];
    
    for (const item of essentials) {
        await handleEdit(config, item);
    }
    
    console.log(`\n${ui.msg('green', '🎉 初始化核心配置已完成。')}`);
    await ask('\n按回车键返回主菜单...');
}

async function main() {
    while (true) {
        showHeader();
        console.log(`\n🚀 本工具由 ${ui.msg('bold', 'Jun')} 基于开源项目 ${ui.msg('blue', 'OpenClaw')} 定制开发。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`  ${ui.msg('yellow', index + 1)}. ${ui.categoryIcon(cat.id)} ${cat.label}`);
        });
        
        console.log(ui.msg('gray', '\n' + ui.separator));
        console.log(`  ${ui.msg('cyan', '0')}. 🌟 快速初始化向导`);
        console.log(`  ${ui.msg('cyan', 'r')}. 🔄 重启网关服务`);
        console.log(`  ${ui.msg('cyan', 'q')}. 🚪 退出管理中心`);
        
        const choice = await ask(`\n👉 请选择分类编号或操作指令: `);
        
        if (choice.toLowerCase() === 'q') {
            console.log('\n再见，系统已退出。');
            process.exit(0);
        }
        
        if (choice.toLowerCase() === 'r') {
            try { 
                execSync('openclaw gateway restart'); 
                console.log(ui.msg('green', '\n✅ 重启信号已发送至网关。')); 
            } catch(e) { 
                console.log(ui.msg('red', '\n❌ 指令发送失败，请确保网关已在后台运行。')); 
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
