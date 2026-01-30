#!/usr/bin/env node

/**
 * OpenClawForJun 主入口
 * 作者: Jun
 * 声明: 本脚本完全免费，严禁倒卖。
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');
const SCHEMA = require('./config-map');

const CONFIG_PATH = path.join(process.env.HOME, '.openclaw', 'openclaw.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function readConfig() {
    if (!fs.existsSync(CONFIG_PATH)) return {};
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function writeConfig(config) {
    if (!fs.existsSync(path.dirname(CONFIG_PATH))) {
        fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function getValue(obj, path) {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

function setValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    
    // 类型自动推断
    if (value.toLowerCase() === 'true') value = true;
    else if (value.toLowerCase() === 'false') value = false;
    else if (!isNaN(value) && value.trim() !== '') value = Number(value);
    
    current[keys[keys.length - 1]] = value;
}

async function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

function showBanner() {
    console.clear();
    console.log(`${colors.cyan}   
      _      _      _
   __(.)< __(.)> __(.)= 
   \\___)  \\___)  \\___)   
    ${colors.reset}`);
    console.log(`${colors.green}==========================================${colors.reset}`);
    console.log(`   🦆 ${colors.bold}OpenClawForJun${colors.reset} 智能管理中心 `);
    console.log(`   ${colors.yellow}作者: Jun | 此工具完全免费 | MIT 协议${colors.reset} `);
    console.log(`${colors.green}==========================================${colors.reset}`);
}

async function subMenu(category) {
    while (true) {
        showBanner();
        console.log(`\n${colors.blue}【${category.label}】${colors.reset}`);
        const config = readConfig();
        
        category.items.forEach((item, index) => {
            const val = getValue(config, item.key);
            const displayVal = val === undefined ? `${colors.red}[未设置]${colors.reset}` : `${colors.green}${val}${colors.reset}`;
            console.log(`${colors.yellow}${index + 1}${colors.reset}. ${item.label}: ${displayVal}`);
            console.log(`   └─ ${item.desc}`);
        });
        
        console.log(`\n${colors.cyan}b${colors.reset}. 返回主菜单`);
        const choice = await ask(`\n请输入编号进行修改: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            const item = category.items[idx];
            console.log(`\n${colors.bold}正在修改: ${item.label}${colors.reset}`);
            console.log(`${colors.yellow}提示: ${item.desc}${colors.reset}`);
            const newVal = await ask(`请输入新值 (直接回车保持不变): `);
            if (newVal.trim() !== '') {
                setValue(config, item.key, newVal.trim());
                writeConfig(config);
                console.log(`${colors.green}✅ 保存成功！${colors.reset}`);
                await new Promise(r => setTimeout(r, 800));
            }
        }
    }
}

async function initWizard() {
    console.clear();
    console.log(`${colors.yellow}--- 🚀 Clawd 中文初始化向导 ---${colors.reset}`);
    console.log(`奴才将引导您完成几个核心配置，剩下的您可以之后在菜单里慢慢调。`);
    
    const config = readConfig();
    const essentials = [
        SCHEMA[0].items[0], // 主模型
        SCHEMA[1].items[0], // 启用 Telegram
        SCHEMA[1].items[1], // Telegram Token
    ];
    
    for (const item of essentials) {
        const current = getValue(config, item.key);
        const res = await ask(`\n${item.label} (${item.desc})\n[当前: ${current || '空'}] -> 请输入: `);
        if (res.trim() !== '') {
            setValue(config, item.key, res.trim());
        }
    }
    
    writeConfig(config);
    console.log(`\n${colors.green}🎉 核心配置已就绪！${colors.reset}`);
    await ask('按回车返回主菜单...');
}

async function main() {
    while (true) {
        showBanner();
        console.log(`\n本项目基于开源项目 ${colors.blue}OpenClaw (原 Clawd)${colors.reset}。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`${colors.yellow}${index + 1}${colors.reset}. ${cat.label}`);
        });
        
        console.log(`\n${colors.cyan}0${colors.reset}. 🚀 开始「中文初始化向导」`);
        console.log(`${colors.cyan}r${colors.reset}. 🔄 重启网关 (使新配置生效)`);
        console.log(`${colors.cyan}q${colors.reset}. 🚪 退出工具`);
        
        const choice = await ask(`\n请选择操作: `);
        
        if (choice.toLowerCase() === 'q') {
            console.log('愿 OpenClaw 与您同在。');
            process.exit(0);
        }
        
        if (choice.toLowerCase() === 'r') {
            console.log(`${colors.yellow}正在发送重启指令...${colors.reset}`);
            try { execSync('openclaw gateway restart'); console.log('✅ 指令已发送。'); } 
            catch(e) { console.log('❌ 重启失败，请手动运行 openclaw gateway restart'); }
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
