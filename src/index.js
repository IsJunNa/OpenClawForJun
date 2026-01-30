#!/usr/bin/env node

/**
 * OpenClawForJun 核心程序
 * 作者: Jun
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
    ui.setLang(engine.getLang());
    console.log(ui.msg('blue', ui.banner));
    console.log(`   ${ui.msg('gray', `${ui.t('author')}: Jun | ${ui.t('license')}: MIT | ${ui.t('free')}`)}`);
    console.log(ui.msg('gray', ui.separator));
}

async function handleEdit(config, item) {
    const lang = engine.getLang();
    console.log(`\n${ui.msg('bold', ui.t('current') + ': ' + item.label[lang])}`);
    
    let newValue = '';
    
    if (item.type === 'boolean') {
        console.log(`\n  1. ${lang === 'zh' ? '开启 (true)' : 'ON (true)'}`);
        console.log(`  2. ${lang === 'zh' ? '关闭 (false)' : 'OFF (false)'}`);
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
            newValue = (item.options[idx].includes('自定义') || item.options[idx].includes('Manual')) 
                ? await ask(`\n${lang === 'zh' ? '请输入内容' : 'Please input'}: `)
                : item.options[idx];
        }
    } else {
        newValue = await ask(`\n${ui.t('newValue')}: `);
    }

    if (newValue !== '') {
        engine.set(config, item.key, newValue);
        engine.write(config);
        console.log(ui.msg('green', `\n${ui.t('saveOk')}`));
        await new Promise(r => setTimeout(r, 1000));
    }
}

async function subMenu(category) {
    const lang = engine.getLang();
    while (true) {
        showHeader();
        console.log(`\n${ui.msg('cyan', '【 ' + category.label[lang] + ' 】')}`);
        const config = engine.read();
        
        category.items.forEach((item, index) => {
            const val = engine.get(config, item.key);
            const displayVal = val === undefined ? ui.msg('red', `[${ui.t('none')}]`) : ui.msg('green', val);
            console.log(`  ${ui.msg('yellow', index + 1)}. ${item.label[lang]}: ${displayVal}`);
        });
        
        console.log(`\n  ${ui.msg('magenta', 'b')}. ${ui.t('back')}`);
        const choice = await ask(`\n👉 ${ui.t('editPrompt')}: `);
        
        if (choice.toLowerCase() === 'b') return;
        
        const idx = parseInt(choice) - 1;
        if (category.items[idx]) {
            await handleEdit(config, category.items[idx]);
        }
    }
}

async function main() {
    while (true) {
        const lang = engine.getLang();
        showHeader();
        console.log(`\n🚀 ${ui.t('baseOn')} ${ui.msg('blue', 'OpenClaw')}。`);
        
        SCHEMA.forEach((cat, index) => {
            console.log(`  ${ui.msg('yellow', index + 1)}. ${ui.categoryIcon(cat.id)} ${cat.label[lang]}`);
        });
        
        console.log(ui.msg('gray', '\n' + ui.separator));
        console.log(`  ${ui.msg('cyan', '0')}. 🌟 ${ui.t('init')}`);
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
            try { execSync('openclaw gateway restart'); console.log(ui.msg('green', ui.t('restartOk'))); } 
            catch(e) { console.log(ui.msg('red', 'ERROR')); }
            await new Promise(r => setTimeout(r, 1500));
            continue;
        }
        
        if (choice === '0') {
            const config = engine.read();
            await handleEdit(config, SCHEMA[0].items[0]);
            await handleEdit(config, SCHEMA[1].items[0]);
            await handleEdit(config, SCHEMA[1].items[1]);
            continue;
        }
        
        const idx = parseInt(choice) - 1;
        if (SCHEMA[idx]) {
            await subMenu(SCHEMA[idx]);
        }
    }
}

main();
