/**
 * OpenClawForJun 配置引擎
 * 处理配置读取、写入与路径查找
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(process.env.HOME, '.openclaw', 'openclaw.json');

module.exports = {
    read() {
        if (!fs.existsSync(CONFIG_PATH)) return {};
        try {
            return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
        } catch (e) {
            console.error('配置文件格式错误');
            return {};
        }
    },

    write(config) {
        const dir = path.dirname(CONFIG_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
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
        
        // 智能类型识别
        const valLower = String(value).toLowerCase();
        if (valLower === 'true') value = true;
        else if (valLower === 'false') value = false;
        else if (!isNaN(value) && value.trim() !== '') value = Number(value);
        
        current[keys[keys.length - 1]] = value;
    }
};
