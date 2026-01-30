/**
 * OpenClawForJun 全量配置映射定义
 * 作者: Jun
 */

module.exports = [
    {
        id: "general",
        label: "常规设置",
        items: [
            { key: "agents.defaults.model.primary", label: "主模型", desc: "AI 响应的核心模型 (如: google-gemini-cli/gemini-3-flash-preview)", type: "string" },
            { key: "agents.defaults.thinkingDefault", label: "思考深度", desc: "模型思考级别", type: "enum", options: ["off", "low", "medium", "high", "xhigh"] },
            { key: "agents.defaults.verboseDefault", label: "详细模式", desc: "是否展示工具调用过程", type: "enum", options: ["on", "off", "full"] },
            { key: "agents.defaults.userTimezone", label: "时区", desc: "如 Asia/Shanghai", type: "string" },
            { key: "agents.defaults.timeFormat", label: "时间格式", desc: "12 或 24 小时制", type: "enum", options: ["12", "24", "auto"] }
        ]
    },
    {
        id: "channels",
        label: "消息频道管理",
        items: [
            { key: "channels.telegram.enabled", label: "Telegram - 启用", desc: "启用 TG 机器人", type: "boolean" },
            { key: "channels.telegram.botToken", label: "Telegram - 令牌", desc: "Bot Token", type: "string" },
            { key: "channels.telegram.dmPolicy", label: "Telegram - 私聊策略", desc: "访问控制模式", type: "enum", options: ["pairing", "allowlist", "open"] },
            { key: "channels.discord.enabled", label: "Discord - 启用", desc: "启用 Discord 机器人", type: "boolean" },
            { key: "channels.discord.token", label: "Discord - 令牌", desc: "Bot Token", type: "string" },
            { key: "channels.whatsapp.enabled", label: "WhatsApp - 启用", desc: "启用 WhatsApp 接入", type: "boolean" },
            { key: "channels.slack.enabled", label: "Slack - 启用", desc: "启用 Slack 接入", type: "boolean" }
        ]
    },
    {
        id: "tools",
        label: "扩展功能与工具",
        items: [
            { key: "tools.web.search.enabled", label: "网页搜索", desc: "允许 AI 联网搜索", type: "boolean" },
            { key: "tools.web.search.provider", label: "搜索提供商", desc: "brave 或 perplexity", type: "enum", options: ["brave", "perplexity"] },
            { key: "tools.web.search.apiKey", label: "搜索 API Key", desc: "搜索服务的 API 密钥", type: "string" },
            { key: "tools.web.fetch.enabled", label: "网页抓取", desc: "允许 AI 读取链接内容", type: "boolean" },
            { key: "tools.media.image.enabled", label: "图像理解", desc: "开启视觉分析能力", type: "boolean" }
        ]
    },
    {
        id: "security",
        label: "安全与权限控制",
        items: [
            { key: "commands.bash", label: "终端指令 (!)", desc: "允许执行 Shell 命令", type: "boolean" },
            { key: "commands.config", label: "配置修改 (/config)", desc: "允许在聊天中改配置", type: "boolean" },
            { key: "commands.restart", label: "网关重启 (/restart)", desc: "允许在聊天中重启网关", type: "boolean" },
            { key: "tools.exec.security", label: "执行安全级别", desc: "命令执行的限制级别", type: "enum", options: ["deny", "allowlist", "full"] }
        ]
    },
    {
        id: "gateway",
        label: "网关与系统设置",
        items: [
            { key: "gateway.port", label: "运行端口", desc: "默认 18789", type: "number" },
            { key: "gateway.bind", label: "绑定地址", desc: "监听范围", type: "enum", options: ["loopback", "lan", "auto"] },
            { key: "logging.level", label: "日志详细度", desc: "日志输出级别", type: "enum", options: ["error", "warn", "info", "debug", "trace"] }
        ]
    }
];
