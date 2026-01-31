/**
 * OpenClawForJun 配置引擎
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();
const CONFIG_PATH = path.join(HOME, '.openclaw', 'openclaw.json');
const LANG_PATH = path.join(HOME, '.openclaw', '.ocfj_lang');

module.exports = {
    read() {
        if (!fs.existsSync(CONFIG_PATH)) return {};
        try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); } 
        catch (e) { return {}; }
    },

    write(config) {
        const dir = path.dirname(CONFIG_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    },

    getLang() {
        if (!fs.existsSync(LANG_PATH)) return 'zh';
        return fs.readFileSync(LANG_PATH, 'utf8').trim() || 'zh';
    },

    setLang(lang) {
        fs.writeFileSync(LANG_PATH, lang);
    },

    get(obj, path) {
        return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
    },

    set(obj, path, value) {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }

        // 类型转换增强
        let finalValue = value;
        if (typeof value === 'string') {
            const valLower = value.toLowerCase().trim();
            if (valLower === 'true') finalValue = true;
            else if (valLower === 'false') finalValue = false;
            else if (!isNaN(valLower) && valLower !== '') finalValue = Number(valLower);
        }

        current[keys[keys.length - 1]] = finalValue;
    }
};
