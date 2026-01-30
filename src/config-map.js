/**
 * OpenClawForJun 全量配置映射定义
 */

module.exports = [
    {
        id: "core",
        label: { zh: "基础核心设置", en: "General Settings" },
        items: [
            { 
                key: "agents.defaults.model.primary", 
                label: { zh: "主 AI 模型", en: "Primary AI Model" }, 
                desc: { zh: "选择 AI 使用的核心脑干模型", en: "Core model for AI responses" }, 
                type: "enum",
                needsKey: true,
                options: [
                    "google-gemini-cli/gemini-3-flash-preview",
                    "google-gemini-cli/gemini-3-pro-preview",
                    "openai/gpt-4o",
                    "openai/gpt-4o-mini",
                    "anthropic/claude-3-5-sonnet-latest",
                    "ollama/llama3",
                    "自定义输入"
                ]
            },
            { 
                key: "agents.defaults.model.fallbacks", 
                label: { zh: "备份 AI 模型", en: "Fallback AI Model" }, 
                desc: { zh: "主模型不可用时自动切换", en: "Auto-switch when primary fails" }, 
                type: "enum",
                isArray: true,
                options: [
                    "google-gemini-cli/gemini-3-flash-preview",
                    "openai/gpt-4o-mini",
                    "自定义输入"
                ]
            },
            { key: "agents.defaults.thinkingDefault", label: { zh: "思考深度", en: "Thinking Depth" }, desc: { zh: "模型推理级别", en: "Reasoning level" }, type: "enum", options: ["off", "low", "medium", "high", "xhigh"] },
            { key: "agents.defaults.userTimezone", label: { zh: "用户时区", en: "User Timezone" }, desc: { zh: "建议 Asia/Shanghai", en: "e.g., Asia/Shanghai" }, type: "enum", options: ["Asia/Shanghai", "Asia/Hong_Kong", "America/New_York", "UTC"] }
        ]
    },
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Messaging Channels" },
        isCategory: true,
        subCategories: [
            {
                id: "tg",
                label: { zh: "Telegram", en: "Telegram" },
                items: [
                    { key: "plugins.entries.telegram.enabled", label: { zh: "启用插件", en: "Enable Plugin" }, type: "boolean" },
                    { key: "channels.telegram.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.telegram.botToken", label: { zh: "机器人令牌", en: "Bot Token" }, type: "string" }
                ]
            },
            {
                id: "whatsapp",
                label: { zh: "WhatsApp", en: "WhatsApp" },
                specialActions: [
                    { id: "login", label: { zh: "📱 扫码登录绑定", en: "📱 Scan QR to Login" }, command: "openclaw whatsapp login" }
                ],
                items: [
                    { key: "plugins.entries.whatsapp.enabled", label: { zh: "启用插件", en: "Enable Plugin" }, type: "boolean" },
                    { key: "channels.whatsapp.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" }
                ]
            }
        ]
    },
    {
        id: "security",
        label: { zh: "安全与权限控制", en: "Security & Permissions" },
        items: [
            { key: "commands.bash", label: { zh: "终端执行 (!)", en: "Bash Command" }, desc: { zh: "高风险权限", en: "High Risk" }, type: "boolean" },
            { key: "tools.exec.security", label: { zh: "执行安全等级", en: "Security Level" }, type: "enum", options: ["deny", "allowlist", "full"] }
        ]
    }
];
