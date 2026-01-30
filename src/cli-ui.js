/**
 * OpenClawForJun UI 样式与翻译
 * 2026-01-30 Final Polish
 */

const colors = {
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

const i18n = {
    zh: {
        title: "OpenClaw 智能管理中心",
        author: "作者: Jun",
        mainPrompt: "请选择分类编号或操作指令",
        back: "返回主菜单",
        editPrompt: "请输入编号进行修改",
        newValue: "请输入新值 (直接回车保持不变)",
        saveOk: "✅ 配置已保存。",
        restarting: "正在发送重启信号...",
        restartOk: "✅ 指令已发送。",
        exit: "退出管理中心",
        langSwitch: "切换语言 (Switch Language)",
        init: "快速初始化向导",
        restart: "重启网关服务",
        baseOn: "本项目基于开源项目",
        selectIdx: "请选择序号",
        current: "当前",
        none: "未设置"
    },
    en: {
        title: "OpenClaw Management Center",
        author: "Author: Jun",
        mainPrompt: "Choose a category or command",
        back: "Back to Main Menu",
        editPrompt: "Enter number to edit",
        newValue: "Enter new value (Enter to skip)",
        saveOk: "✅ Configuration saved.",
        restarting: "Sending restart signal...",
        restartOk: "✅ Signal sent.",
        exit: "Exit",
        langSwitch: "Switch Language (切换语言)",
        init: "Fast Setup Wizard",
        restart: "Restart Gateway",
        baseOn: "Based on open-source project",
        selectIdx: "Select index",
        current: "Current",
        none: "Not Set"
    }
};

let currentLang = 'zh';

module.exports = {
    colors,
    setLang(l) { currentLang = l; },
    t(key) { return i18n[currentLang][key] || key; },
    
    getBanner() {
        const text = i18n[currentLang];
        const duck = `
      ${colors.yellow}  ,,            ,,     ,,     ,,${colors.reset}
      ${colors.yellow} (  ' )>       (  )>  (  )>  (  )>${colors.reset}
      ${colors.yellow}< (  /   ~~~~  ( /    ( /    ( /${colors.reset}
      ${colors.yellow} \`---'         \`-'    \`-'    \`-'${colors.reset}
${colors.blue}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~${colors.reset}`;

        const boxTop    = colors.cyan + '┌──────────────────────────────────────────────────┐' + colors.reset;
        const boxEmpty  = colors.cyan + '│                                                  │' + colors.reset;
        const boxBottom = colors.cyan + '└──────────────────────────────────────────────────┘' + colors.reset;

        // 拼接头部
        return `
${boxTop}
${boxEmpty}
${this.wrapInBox(duck.split('\n')[1])}
${this.wrapInBox(duck.split('\n')[2])}
${this.wrapInBox(duck.split('\n')[3])}
${this.wrapInBox(duck.split('\n')[4])}
${this.wrapInBox(duck.split('\n')[5])}
${boxEmpty}
${this.wrapInBox(colors.bold + this.centerText(text.title, 48) + colors.reset)}
${this.wrapInBox(colors.gray + this.centerText(text.author, 48) + colors.reset)}
${boxBottom}
    `;
    },

    // 辅助函数：将一行内容包在边框内并确保对齐
    wrapInBox(content) {
        // 剥离 ANSI 颜色代码计算真实长度
        const cleanContent = content.replace(/\x1b\[[0-9;]*m/g, '');
        // 处理 CJK 字符宽度
        const visualLen = cleanContent.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
        const padding = 50 - visualLen;
        const leftPad = Math.floor(padding / 2);
        const rightPad = padding - leftPad;
        return colors.cyan + '│' + colors.reset + ' '.repeat(leftPad) + content + ' '.repeat(rightPad) + colors.cyan + '│' + colors.reset;
    },

    centerText(text, width) {
        const len = text.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
        const pad = Math.max(0, Math.floor((width - len) / 2));
        return ' '.repeat(pad) + text + ' '.repeat(Math.max(0, width - len - pad));
    },

    separator: '──────────────────────────────────────────────────',
    
    msg(color, text) { return `${colors[color] || ''}${text}${colors.reset}`; },

    categoryIcon(id) {
        const icons = { core: '🧠', channels: '📱', security: '🛡️' };
        return icons[id] || '•';
    }
};
