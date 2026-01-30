/**
 * OpenClawForJun UI 样式库
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

module.exports = {
    colors,
    
    // 极简专业风格 Banner
    banner: `
    ┌──────────────────────────────────────────────────┐
    │           ${colors.bold}OpenClaw Management Center${colors.reset}             │
    │           ${colors.gray}Simplified & Professional${colors.reset}              │
    └──────────────────────────────────────────────────┘
    `,

    separator: '──────────────────────────────────────────────────',
    
    msg(color, text) {
        return `${colors[color] || ''}${text}${colors.reset}`;
    },

    categoryIcon(id) {
        const icons = {
            general: '⚙️',
            channels: '📱',
            tools: '🔧',
            security: '🛡️',
            gateway: '🌐'
        };
        return icons[id] || '•';
    }
};
