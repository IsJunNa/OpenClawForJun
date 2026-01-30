/**
 * OpenClawForJun 配置引擎
 * 增强版 - 支持复杂数据类型和验证
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const HOME = os.homedir();
const CONFIG_DIR = path.join(HOME, '.openclaw');
const CONFIG_PATH = path.join(CONFIG_DIR, 'openclaw.json');
const LANG_PATH = path.join(CONFIG_DIR, '.ocfj_lang');
const BACKUP_PATH = path.join(CONFIG_DIR, 'openclaw.backup.json');

// 确保配置目录存在
function ensureConfigDir() {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
}

module.exports = {
    // 获取配置路径
    getConfigPath() {
        return CONFIG_PATH;
    },

    // 读取配置
    read() {
        ensureConfigDir();
        if (!fs.existsSync(CONFIG_PATH)) return {};
        try {
            const content = fs.readFileSync(CONFIG_PATH, 'utf8');
            return JSON.parse(content);
        } catch (e) {
            console.error('配置文件解析错误:', e.message);
            return {};
        }
    },

    // 写入配置（带备份）
    write(config) {
        ensureConfigDir();

        // 创建备份
        if (fs.existsSync(CONFIG_PATH)) {
            try {
                fs.copyFileSync(CONFIG_PATH, BACKUP_PATH);
            } catch (e) {
                // 备份失败不影响主流程
            }
        }

        // 移除内部使用的临时标记
        const configToSave = { ...config };

        fs.writeFileSync(CONFIG_PATH, JSON.stringify(configToSave, null, 2), 'utf8');
    },

    // 获取语言设置
    getLang() {
        ensureConfigDir();
        if (!fs.existsSync(LANG_PATH)) return 'zh';
        try {
            return fs.readFileSync(LANG_PATH, 'utf8').trim() || 'zh';
        } catch (e) {
            return 'zh';
        }
    },

    // 设置语言
    setLang(lang) {
        ensureConfigDir();
        fs.writeFileSync(LANG_PATH, lang, 'utf8');
    },

    // 获取嵌套属性值
    get(obj, keyPath) {
        if (!obj || !keyPath) return undefined;
        return keyPath.split('.').reduce((current, key) => {
            if (current === null || current === undefined) return undefined;
            return current[key];
        }, obj);
    },

    // 设置嵌套属性值（支持复杂类型）
    set(obj, keyPath, value) {
        if (!obj || !keyPath) return;

        const keys = keyPath.split('.');
        let current = obj;

        // 创建嵌套对象路径
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }

        const finalKey = keys[keys.length - 1];

        // 智能类型转换
        value = this.parseValue(value);

        current[finalKey] = value;
    },

    // 智能类型解析
    parseValue(value) {
        // 已经是非字符串类型，直接返回
        if (typeof value !== 'string') return value;

        // 空字符串保持原样
        if (value === '') return value;

        // 布尔值
        const lowerVal = value.toLowerCase();
        if (lowerVal === 'true') return true;
        if (lowerVal === 'false') return false;

        // null
        if (lowerVal === 'null') return null;

        // 数字
        if (/^-?\d+$/.test(value)) {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num <= Number.MAX_SAFE_INTEGER) return num;
        }
        if (/^-?\d+\.\d+$/.test(value)) {
            const num = parseFloat(value);
            if (!isNaN(num)) return num;
        }

        // JSON 数组/对象
        if ((value.startsWith('[') && value.endsWith(']')) ||
            (value.startsWith('{') && value.endsWith('}'))) {
            try {
                return JSON.parse(value);
            } catch (e) {
                // 解析失败，保持字符串
            }
        }

        // 默认保持字符串
        return value;
    },

    // 删除属性
    delete(obj, keyPath) {
        if (!obj || !keyPath) return false;

        const keys = keyPath.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) return false;
            current = current[keys[i]];
        }

        const finalKey = keys[keys.length - 1];
        if (current.hasOwnProperty(finalKey)) {
            delete current[finalKey];
            return true;
        }
        return false;
    },

    // 检查属性是否存在
    has(obj, keyPath) {
        return this.get(obj, keyPath) !== undefined;
    },

    // 列出指定路径下的所有键
    keys(obj, keyPath) {
        const target = keyPath ? this.get(obj, keyPath) : obj;
        if (!target || typeof target !== 'object') return [];
        return Object.keys(target);
    },

    // 恢复备份
    restoreBackup() {
        if (fs.existsSync(BACKUP_PATH)) {
            fs.copyFileSync(BACKUP_PATH, CONFIG_PATH);
            return true;
        }
        return false;
    },

    // 导出配置（用于调试）
    export() {
        const config = this.read();
        // 过滤敏感信息
        const exported = JSON.parse(JSON.stringify(config));
        this.redactSecrets(exported);
        return JSON.stringify(exported, null, 2);
    },

    // 隐藏敏感信息
    redactSecrets(obj, parentKey = '') {
        if (!obj || typeof obj !== 'object') return;

        const sensitiveKeys = ['apiKey', 'token', 'secret', 'password', 'key'];

        for (const key of Object.keys(obj)) {
            const lowerKey = key.toLowerCase();
            if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
                if (typeof obj[key] === 'string' && obj[key].length > 0) {
                    obj[key] = obj[key].substring(0, 4) + '***[已隐藏]';
                }
            } else if (typeof obj[key] === 'object') {
                this.redactSecrets(obj[key], key);
            }
        }
    }
};
