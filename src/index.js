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
    // 基础类型处理
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
    console.log(`${colors.green}==========================================${colors.reset}`);
    console.log(`   🦆 ${colors.bold}OpenClawForJun${colors.reset} 智能管理中心 `);
    console.log(`   ${colors.yellow}作者: Jun | 本工具完全免费${colors.reset} `);
    console.log(`${colors.green}==========================================${colors.reset}`);
}

async function subMenu(category) {
    while (true) {
        showBanner();
        console.log(`\n${colors.blue}【${category.label}】${colors.reset}`);
        const config = readConfig();
        
        category.items.forEach((item, index) => {
            const val = getValue(config, item.key);
            const status = val === undefined ? `${colors.red}[未设置]${colors.reset}` : `${colors.green}${val}${colors.reset}`;
            console.log(`${index + 1}. ${item.label}: ${status}`);
            console.log(`   └─ ${item.desc}`);
        });
        
        console.log(`\nb. 返回主菜单`);
        const choice = await ask(`\n请输入编号进行修改: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            const item = category.items[idx];
            const newVal = await ask(`\n修改 [${item.label}]\n请输入新值: `);
            if (newVal.trim() !== '') {
                setValue(config, item.key, newVal.trim());
                writeConfig(config);
                console.log(`${colors.green}保存成功！${colors.reset}`);
                await new Promise(r => setTimeout(resolve, 800));
            }
        }
    }
}

async function main() {
    while (true) {
        showBanner();
        console.log(`\n本项目基于开源项目 ${colors.blue}OpenClaw (原 Clawd)${colors.reset}。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`${index + 1}. ${cat.label}`);
        });
        
        console.log(`\n0. 开始「中文初始化向导」`);
        console.log(`r. 重启网关 (使新配置生效)`);
        console.log(`q. 退出工具`);
        
        const choice = await ask(`\n请选择操作: `);
        
        if (choice.toLowerCase() === 'q') process.exit(0);
        if (choice.toLowerCase() === 'r') {
            console.log('正在发送重启指令...');
            try { execSync('openclaw gateway restart'); } catch(e) {}
            process.exit(0);
        }
        
        if (choice === '0') {
            // 初始化向导逻辑 (略，可后续迭代)
            console.log('向导开发中...');
            await new Promise(r => setTimeout(r, 1000));
            continue;
        }
        
        const idx = parseInt(choice) - 1;
        if (SCHEMA[idx]) {
            await subMenu(SCHEMA[idx]);
        }
    }
}

main();
