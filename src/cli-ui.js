/**
 * OpenClawForJun UI 样式与翻译
 * 优化版 - 修复对齐和兼容性问题
 */

// ANSI 颜色（使用基础色确保兼容性）
const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m',
    white: '\x1b[97m',
    orange: '\x1b[38;5;208m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m'
};

// 状态图标（纯 ASCII 兼容）
const icons = {
    success: '[OK]',
    error: '[ERR]',
    warning: '[!]',
    info: '[i]',
    loading: '[..]',
    rocket: '>>',
    key: '[K]',
    lock: '[L]',
    gear: '[*]',
    arrow: '->',
    check: '+',
    cross: 'x',
    dot: '*'
};

// 边框字符
const box = {
    double: {
        tl: '+', tr: '+', bl: '+', br: '+',
        h: '=', v: '|'
    },
    round: {
        tl: '+', tr: '+', bl: '+', br: '+',
        h: '-', v: '|'
    }
};

const i18n = {
    zh: {
        title: "OpenClaw 智能管理中心",
        subtitle: "一站式 AI 助手配置平台",
        author: "作者: Jun",
        version: "版本",
        mainPrompt: "请选择功能项",
        back: "返回上级",
        saveOk: "配置已保存",
        restarting: "正在发送重启信号...",
        restartOk: "指令已发送",
        exit: "退出",
        langSwitch: "切换语言 / Switch Language",
        restart: "重启网关服务",
        enterToContinue: "按 Enter 继续..."
    },
    en: {
        title: "OpenClaw Management Center",
        subtitle: "All-in-One AI Assistant Config",
        author: "Author: Jun",
        version: "Version",
        mainPrompt: "Select an option",
        back: "Go Back",
        saveOk: "Configuration saved",
        restarting: "Sending restart signal...",
        restartOk: "Signal sent",
        exit: "Exit",
        langSwitch: "Switch Language / 切换语言",
        restart: "Restart Gateway",
        enterToContinue: "Press Enter to continue..."
    }
};

let currentLang = 'zh';

module.exports = {
    colors,
    icons,
    box,

    setLang(l) { currentLang = l; },
    getLang() { return currentLang; },
    t(key) { return i18n[currentLang][key] || key; },

    // 简洁 Banner
    getBanner(version) {
        const text = i18n[currentLang];
        const width = 50;
        const line = '='.repeat(width);

        const centerText = (str, w) => {
            const pad = Math.max(0, Math.floor((w - str.length) / 2));
            return ' '.repeat(pad) + str + ' '.repeat(Math.max(0, w - str.length - pad));
        };

        return `
${colors.cyan}${line}${colors.reset}

${colors.yellow}${colors.bold}${centerText(text.title, width)}${colors.reset}
${colors.gray}${centerText(text.subtitle, width)}${colors.reset}

${colors.dim}${centerText(`${text.version}: v${version} | ${text.author}`, width)}${colors.reset}

${colors.cyan}${line}${colors.reset}
`;
    },

    // 消息格式化  
    msg(color, text) {
        return `${colors[color] || ''}${text}${colors.reset}`;
    },

    success(text) { return `${colors.green}${icons.success} ${text}${colors.reset}`; },
    error(text) { return `${colors.red}${icons.error} ${text}${colors.reset}`; },
    warning(text) { return `${colors.yellow}${icons.warning} ${text}${colors.reset}`; },
    info(text) { return `${colors.cyan}${icons.info} ${text}${colors.reset}`; },

    // 分类图标
    categoryIcon(id) {
        const iconMap = {
            core: '[C]',
            channels: '[CH]',
            security: '[S]',
            tg: '[TG]',
            whatsapp: '[WA]',
            discord: '[DC]',
            mattermost: '[MM]',
            signal: '[SG]',
            imessage: '[iM]',
            slack: '[SL]',
            googlechat: '[GC]',
            sessions: '[SS]',
            browser: '[BR]',
            skills: '[SK]',
            plugins: '[PL]',
            cron: '[CR]',
            webhooks: '[WH]',
            gateway: '[GW]',
            auth: '[AU]',
            messages: '[MS]',
            logging: '[LG]',
            ui: '[UI]'
        };
        return colors.cyan + (iconMap[id] || '[?]') + colors.reset;
    },

    // 分隔线
    separator(width = 45) {
        return colors.gray + '-'.repeat(width) + colors.reset;
    },

    // 简单信息框
    infoBox(title, content) {
        const width = 48;
        const border = '-'.repeat(width);
        const lines = content.split('\n');

        let result = `\n${colors.cyan}${border}${colors.reset}\n`;
        result += `${colors.bold} ${title}${colors.reset}\n`;
        result += `${colors.cyan}${border}${colors.reset}\n`;

        lines.forEach(line => {
            result += ` ${line}\n`;
        });

        result += `${colors.cyan}${border}${colors.reset}\n`;
        return result;
    }
};
