/**
 * OpenClawForJun UI 样式与翻译
 * 全新设计 - 渐变色、动画、现代视觉
 */

// 256色和TrueColor支持
const colors = {
    // 基础色
    green: '\x1b[38;5;82m',
    blue: '\x1b[38;5;39m',
    yellow: '\x1b[38;5;220m',
    red: '\x1b[38;5;196m',
    cyan: '\x1b[38;5;51m',
    magenta: '\x1b[38;5;201m',
    gray: '\x1b[38;5;245m',
    white: '\x1b[38;5;255m',
    orange: '\x1b[38;5;208m',
    pink: '\x1b[38;5;213m',
    purple: '\x1b[38;5;141m',
    
    // 渐变色组
    gradient: {
        orange: ['\x1b[38;5;208m', '\x1b[38;5;209m', '\x1b[38;5;210m', '\x1b[38;5;211m', '\x1b[38;5;212m'],
        cyan: ['\x1b[38;5;45m', '\x1b[38;5;44m', '\x1b[38;5;43m', '\x1b[38;5;42m', '\x1b[38;5;41m'],
        purple: ['\x1b[38;5;129m', '\x1b[38;5;135m', '\x1b[38;5;141m', '\x1b[38;5;147m', '\x1b[38;5;153m']
    },
    
    // 背景色
    bgBlue: '\x1b[48;5;24m',
    bgGray: '\x1b[48;5;236m',
    bgDark: '\x1b[48;5;232m',
    
    // 样式
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    blink: '\x1b[5m'
};

// 状态图标
const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    loading: '🔄',
    rocket: '🚀',
    star: '⭐',
    fire: '🔥',
    key: '🔑',
    lock: '🔒',
    unlock: '🔓',
    gear: '⚙️',
    wrench: '🔧',
    plug: '🔌',
    globe: '🌐',
    robot: '🤖',
    brain: '🧠',
    lightning: '⚡',
    check: '✓',
    cross: '✗',
    arrow: '➜',
    dot: '●',
    circle: '○',
    diamond: '◆',
    triangle: '▶',
    lobster: '🦞',
    crab: '🦀'
};

// 边框字符
const box = {
    // 双线框
    double: {
        tl: '╔', tr: '╗', bl: '╚', br: '╝',
        h: '═', v: '║',
        lt: '╠', rt: '╣', tt: '╦', bt: '╩', cross: '╬'
    },
    // 圆角框
    round: {
        tl: '╭', tr: '╮', bl: '╰', br: '╯',
        h: '─', v: '│',
        lt: '├', rt: '┤', tt: '┬', bt: '┴', cross: '┼'
    },
    // 粗线框
    heavy: {
        tl: '┏', tr: '┓', bl: '┗', br: '┛',
        h: '━', v: '┃',
        lt: '┣', rt: '┫', tt: '┳', bt: '┻', cross: '╋'
    }
};

const i18n = {
    zh: {
        title: "OpenClaw 智能管理中心",
        subtitle: "一站式 AI 助手配置平台",
        author: "作者: Jun",
        version: "版本",
        mainPrompt: "请选择分类或操作",
        back: "返回上级",
        editPrompt: "请输入编号进行修改",
        newValue: "请输入新值 (直接回车保持不变)",
        saveOk: "配置已保存",
        restarting: "正在发送重启信号...",
        restartOk: "指令已发送",
        exit: "退出管理中心",
        langSwitch: "切换语言 (Switch Language)",
        init: "快速初始化向导",
        restart: "重启网关服务",
        baseOn: "基于开源项目",
        selectIdx: "请选择序号",
        current: "当前",
        none: "未设置",
        welcome: "欢迎使用 OpenClaw 管理中心",
        tip: "小贴士",
        updating: "正在检查更新...",
        updateFound: "发现新版本",
        updateNow: "立即更新 (推荐)",
        updateLater: "暂时跳过",
        noNetwork: "无法连接网络，跳过更新检查",
        enterToContinue: "按 Enter 继续..."
    },
    en: {
        title: "OpenClaw Management Center",
        subtitle: "All-in-One AI Assistant Configuration",
        author: "Author: Jun",
        version: "Version",
        mainPrompt: "Choose a category or action",
        back: "Go Back",
        editPrompt: "Enter number to edit",
        newValue: "Enter new value (Enter to skip)",
        saveOk: "Configuration saved",
        restarting: "Sending restart signal...",
        restartOk: "Signal sent",
        exit: "Exit",
        langSwitch: "Switch Language (切换语言)",
        init: "Quick Setup Wizard",
        restart: "Restart Gateway",
        baseOn: "Based on open-source project",
        selectIdx: "Select index",
        current: "Current",
        none: "Not Set",
        welcome: "Welcome to OpenClaw Management Center",
        tip: "Tip",
        updating: "Checking for updates...",
        updateFound: "New version available",
        updateNow: "Update Now (Recommended)",
        updateLater: "Skip for Now",
        noNetwork: "Cannot connect to network, skipping update check",
        enterToContinue: "Press Enter to continue..."
    }
};

let currentLang = 'zh';

// Spinner 动画帧
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let spinnerIndex = 0;

module.exports = {
    colors,
    icons,
    box,
    spinnerFrames,
    
    setLang(l) { currentLang = l; },
    getLang() { return currentLang; },
    t(key) { return i18n[currentLang][key] || key; },
    
    // 获取下一个 Spinner 帧
    getSpinner() {
        const frame = spinnerFrames[spinnerIndex];
        spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
        return colors.cyan + frame + colors.reset;
    },
    
    // 渐变文本
    gradientText(text, gradientType = 'orange') {
        const gradient = colors.gradient[gradientType] || colors.gradient.orange;
        const chars = text.split('');
        let result = '';
        chars.forEach((char, i) => {
            const colorIndex = Math.floor((i / chars.length) * gradient.length);
            result += gradient[colorIndex] + char;
        });
        return result + colors.reset;
    },
    
    // 创建进度条
    progressBar(percent, width = 30) {
        const filled = Math.round(percent / 100 * width);
        const empty = width - filled;
        const filledBar = colors.green + '█'.repeat(filled) + colors.reset;
        const emptyBar = colors.gray + '░'.repeat(empty) + colors.reset;
        return `${filledBar}${emptyBar} ${percent}%`;
    },
    
    // 全新 Banner 设计
    getBanner(version) {
        const text = i18n[currentLang];
        const b = box.double;
        const width = 56;
        
        // ASCII Art 龙虾
        const lobsterArt = [
            `${colors.orange}        ${colors.red}▄▄▄${colors.orange}     ${colors.red}▄▄▄${colors.reset}`,
            `${colors.orange}       ${colors.red}█${colors.orange}  ${colors.yellow}◉${colors.orange} ${colors.red}▀${colors.orange}   ${colors.red}▀${colors.orange} ${colors.yellow}◉${colors.orange}  ${colors.red}█${colors.reset}`,
            `${colors.orange}        ${colors.red}▀${colors.orange}▄▄▄${colors.red}█████${colors.orange}▄▄▄${colors.red}▀${colors.reset}`,
            `${colors.orange}      ${colors.red}▄${colors.orange}    ${colors.red}▀███████▀${colors.orange}    ${colors.red}▄${colors.reset}`,
            `${colors.orange}     ${colors.red}█${colors.orange} ${colors.yellow}═══${colors.orange} ${colors.red}▄█████▄${colors.orange} ${colors.yellow}═══${colors.orange} ${colors.red}█${colors.reset}`,
            `${colors.orange}      ${colors.red}▀▄${colors.orange}   ${colors.red}▀▀███▀▀${colors.orange}   ${colors.red}▄▀${colors.reset}`,
            `${colors.orange}        ${colors.red}▀▀▄▄${colors.orange}     ${colors.red}▄▄▀▀${colors.reset}`
        ];
        
        const createLine = (content, centerIt = true) => {
            const cleanContent = content.replace(/\x1b\[[0-9;]*m/g, '');
            const visualLen = cleanContent.replace(/[^\x00-\x7F]/g, 'aa').length;
            if (centerIt) {
                const padding = width - 2 - visualLen;
                const leftPad = Math.max(0, Math.floor(padding / 2));
                const rightPad = Math.max(0, padding - leftPad);
                return `${colors.cyan}${b.v}${colors.reset}${' '.repeat(leftPad)}${content}${' '.repeat(rightPad)}${colors.cyan}${b.v}${colors.reset}`;
            }
            return `${colors.cyan}${b.v}${colors.reset} ${content}${' '.repeat(Math.max(0, width - 3 - visualLen))}${colors.cyan}${b.v}${colors.reset}`;
        };

        const topBorder = `${colors.cyan}${b.tl}${b.h.repeat(width - 2)}${b.tr}${colors.reset}`;
        const bottomBorder = `${colors.cyan}${b.bl}${b.h.repeat(width - 2)}${b.br}${colors.reset}`;
        const emptyLine = createLine('');
        const separator = `${colors.cyan}${b.lt}${box.round.h.repeat(width - 2)}${b.rt}${colors.reset}`;
        
        const titleLine = this.gradientText(`${icons.lobster} ${text.title} ${icons.lobster}`, 'orange');
        const subtitleLine = `${colors.gray}${text.subtitle}${colors.reset}`;
        const versionLine = `${colors.dim}${text.version}: ${colors.green}v${version}${colors.reset}${colors.dim} | ${text.author}${colors.reset}`;
        
        return `
${topBorder}
${emptyLine}
${lobsterArt.map(line => createLine(line)).join('\n')}
${emptyLine}
${separator}
${emptyLine}
${createLine(titleLine)}
${createLine(subtitleLine)}
${emptyLine}
${createLine(versionLine)}
${emptyLine}
${bottomBorder}
`;
    },
    
    // 消息格式化  
    msg(color, text, icon = null) { 
        const iconStr = icon ? `${icon} ` : '';
        return `${colors[color] || ''}${iconStr}${text}${colors.reset}`; 
    },
    
    // 成功消息
    success(text) {
        return this.msg('green', text, icons.success);
    },
    
    // 错误消息
    error(text) {
        return this.msg('red', text, icons.error);
    },
    
    // 警告消息
    warning(text) {
        return this.msg('yellow', text, icons.warning);
    },
    
    // 信息消息
    info(text) {
        return this.msg('cyan', text, icons.info);
    },
    
    // 分类图标映射
    categoryIcon(id) {
        const iconMap = {
            core: icons.brain,
            channels: '📱',
            security: icons.lock,
            tg: '✈️',
            whatsapp: '💬',
            discord: '🎮',
            mattermost: '🔷',
            signal: '🔵',
            imessage: '💬',
            slack: '💼',
            googlechat: '💚',
            sessions: '🔄',
            browser: '🌐',
            skills: '🧩',
            plugins: icons.plug,
            cron: '⏰',
            webhooks: '🔗',
            gateway: '🚪',
            agents: icons.robot,
            models: icons.brain,
            automation: icons.lightning
        };
        return iconMap[id] || icons.gear;
    },
    
    // 创建带边框的信息框
    infoBox(title, content, type = 'info') {
        const b = box.round;
        const width = 50;
        const colorMap = {
            info: colors.cyan,
            success: colors.green,
            warning: colors.yellow,
            error: colors.red
        };
        const borderColor = colorMap[type] || colors.cyan;
        
        const lines = content.split('\n');
        let result = `${borderColor}${b.tl}${b.h.repeat(width - 2)}${b.tr}${colors.reset}\n`;
        result += `${borderColor}${b.v}${colors.reset} ${colors.bold}${title}${colors.reset}${' '.repeat(width - 4 - title.length)}${borderColor}${b.v}${colors.reset}\n`;
        result += `${borderColor}${b.lt}${b.h.repeat(width - 2)}${b.rt}${colors.reset}\n`;
        
        lines.forEach(line => {
            const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');
            const padding = Math.max(0, width - 4 - cleanLine.length);
            result += `${borderColor}${b.v}${colors.reset} ${line}${' '.repeat(padding)}${borderColor}${b.v}${colors.reset}\n`;
        });
        
        result += `${borderColor}${b.bl}${b.h.repeat(width - 2)}${b.br}${colors.reset}`;
        return result;
    },
    
    // 分隔线
    separator(char = '─', width = 50, color = 'gray') {
        return `${colors[color]}${char.repeat(width)}${colors.reset}`;
    },
    
    // 高亮键值对
    keyValue(key, value, keyColor = 'cyan', valueColor = 'green') {
        return `${colors[keyColor]}${key}:${colors.reset} ${colors[valueColor]}${value}${colors.reset}`;
    }
};
