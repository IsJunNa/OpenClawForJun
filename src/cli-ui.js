/**
 * OpenClawForJun UI 样式库
 */

module.exports = {
    colors: {
        green: '\x1b[32m',
        blue: '\x1b[34m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
        cyan: '\x1b[36m',
        magenta: '\x1b[35m',
        reset: '\x1b[0m',
        bold: '\x1b[1m'
    },
    
    banner: `
      _      _      _
   __(.)< __(.)> __(.)= 
   \\___)  \\___)  \\___)   
    `,

    separator: '==================================================',
    
    msg(color, text) {
        return `${this.colors[color]}${text}${this.colors.reset}`;
    },

    categoryIcon(id) {
        const icons = {
            core: '🧠',
            telegram: '📡',
            discord: '🎮',
            whatsapp: '💬',
            search: '🔍',
            security: '🛡️',
            system: '⚙️'
        };
        return icons[id] || '🔹';
    }
};
