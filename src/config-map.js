/**
 * OpenClawForJun 全量配置映射定义
 * 作者: Jun
 */

module.exports = [
    {
        id: "general",
        label: "基础核心设置",
        items: [
            { 
                key: "agents.defaults.model.primary", 
                label: "主 AI 模型", 
                desc: "选择 AI 回复使用的核心模型", 
                type: "enum",
                options: [
                    "google-gemini-cli/gemini-3-flash-preview",
                    "google-gemini-cli/gemini-3-pro-preview",
                    "openai/gpt-4o",
                    "openai/gpt-4o-mini",
                    "anthropic/claude-3-5-sonnet-latest",
                    "anthropic/claude-3-5-haiku-latest",
                    "ollama/llama3",
                    "ollama/qwen2.5",
                    "自定义输入"
                ]
            },
            { key: "agents.defaults.thinkingDefault", label: "思考深度", desc: "模型处理问题的深度级别", type: "enum", options: ["off", "low", "medium", "high", "xhigh"] },
            { key: "agents.defaults.verboseDefault", label: "详细模式", desc: "是否展示工具调用的中间过程", type: "enum", options: ["on", "off", "full"] },
            { key: "agents.defaults.userTimezone", label: "用户时区", desc: "如 Asia/Shanghai", type: "string" },
            { key: "agents.defaults.timeFormat", label: "时间格式", desc: "12 或 24 小时制", type: "enum", options: ["12", "24", "auto"] }
        ]
    },
    {
        id: "channels",
        label: "通信频道管理",
        items: [
            { key: "channels.telegram.enabled", label: "Telegram - 状态", desc: "是否启用机器人频道", type: "boolean" },
            { key: "channels.telegram.botToken", label: "Telegram - 令牌", desc: "从 @BotFather 获取的 Token", type: "string" },
            { key: "channels.telegram.dmPolicy", label: "Telegram - 私聊策略", desc: "配对或公开访问策略", type: "enum", options: ["pairing", "allowlist", "open"] },
            { key: "channels.discord.enabled", label: "Discord - 状态", desc: "是否启用 Discord 接入", type: "boolean" },
            { key: "channels.discord.token", label: "Discord - 令牌", desc: "来自开发者平台的 Token", type: "string" },
            { key: "channels.whatsapp.enabled", label: "WhatsApp - 状态", desc: "是否启用 WhatsApp 接入", type: "boolean" },
            { key: "channels.slack.enabled", label: "Slack - 状态", desc: "是否启用 Slack 接入", type: "boolean" }
        ]
    },
    {
        id: "tools",
        label: "工具与扩展权限",
        items: [
            { key: "tools.web.search.enabled", label: "网页搜索", desc: "允许 AI 联网检索实时信息", type: "boolean" },
            { key: "tools.web.search.provider", label: "搜索提供商", desc: "选择搜索服务商", type: "enum", options: ["brave", "perplexity"] },
            { key: "tools.web.search.apiKey", label: "搜索 API Key", desc: "对应服务商的 API 密钥", type: "string" },
            { key: "tools.web.fetch.enabled", label: "网页抓取", desc: "允许 AI 解析网页链接内容", type: "boolean" },
            { key: "tools.media.image.enabled", label: "视觉理解", desc: "开启 AI 分析图像的能力", type: "boolean" }
        ]
    },
    {
        id: "security",
        label: "系统安全策略",
        items: [
            { key: "commands.bash", label: "终端执行 (!)", desc: "是否允许 AI 在宿主机执行命令", type: "boolean" },
            { key: "commands.config", label: "动态配置 (/config)", desc: "允许在对话中实时修改配置", type: "boolean" },
            { key: "commands.restart", label: "远程重启", desc: "允许通过对话重启网关服务", type: "boolean" },
            { key: "tools.exec.security", label: "执行安全等级", desc: "deny/allowlist/full", type: "enum", options: ["deny", "allowlist", "full"] }
        ]
    },
    {
        id: "system",
        label: "网关底层设置",
        items: [
            { key: "gateway.port", label: "运行端口", desc: "默认 18789", type: "number" },
            { key: "gateway.bind", label: "绑定地址", desc: "loopback/lan/auto", type: "enum", options: ["loopback", "lan", "auto"] },
            { key: "logging.level", label: "日志详细度", desc: "error/info/debug/trace", type: "enum", options: ["error", "warn", "info", "debug", "trace"] }
        ]
    }
];
