/**
 * OpenClawForJun 配置映射定义
 * 包含中英文双语支持
 * 已根据最新 OpenClaw 插件化架构进行优化
 */

module.exports = [
    {
        id: "general",
        label: { zh: "基础核心设置", en: "General Settings" },
        items: [
            { 
                key: "agents.defaults.model.primary", 
                label: { zh: "主 AI 模型", en: "Primary AI Model" }, 
                desc: { zh: "选择 AI 使用的核心模型", en: "Core model for AI responses" }, 
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
                    "自定义/Manual Input"
                ]
            },
            { 
                key: "agents.defaults.thinkingDefault", 
                label: { zh: "思考深度", en: "Thinking Depth" }, 
                desc: { zh: "模型处理问题的深度级别", en: "Thinking level for the agent" }, 
                type: "enum", 
                options: ["off", "low", "medium", "high", "xhigh"] 
            },
            { 
                key: "agents.defaults.verboseDefault", 
                label: { zh: "详细模式", en: "Verbose Mode" }, 
                desc: { zh: "是否展示工具调用的中间过程", en: "Show tool invocation details" }, 
                type: "enum", 
                options: ["on", "off", "full"] 
            },
            { 
                key: "agents.defaults.userTimezone", 
                label: { zh: "用户时区", en: "User Timezone" }, 
                desc: { zh: "建议 Asia/Shanghai", en: "e.g., Asia/Shanghai" }, 
                type: "string" 
            }
        ]
    },
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Messaging Channels" },
        items: [
            { key: "plugins.entries.telegram.enabled", label: { zh: "Telegram - 插件状态", en: "Telegram Plugin" }, desc: { zh: "启用 TG 插件", en: "Enable TG Plugin" }, type: "boolean" },
            { key: "channels.telegram.enabled", label: { zh: "Telegram - 频道开关", en: "Telegram Channel" }, desc: { zh: "开启机器人通信", en: "Enable TG communication" }, type: "boolean" },
            { key: "channels.telegram.botToken", label: { zh: "Telegram - 令牌", en: "Telegram - Token" }, desc: { zh: "Bot Token (必须是字符串)", en: "Bot Token (String required)" }, type: "string" },
            { key: "channels.telegram.dmPolicy", label: { zh: "Telegram - 私聊策略", en: "Telegram - DM Policy" }, desc: { zh: "pairing/allowlist/open", en: "Access control policy" }, type: "enum", options: ["pairing", "allowlist", "open"] },
            
            { key: "plugins.entries.discord.enabled", label: { zh: "Discord - 插件状态", en: "Discord Plugin" }, desc: { zh: "启用 Discord 插件", en: "Enable Discord Plugin" }, type: "boolean" },
            { key: "channels.discord.enabled", label: { zh: "Discord - 频道开关", en: "Discord Channel" }, desc: { zh: "开启机器人通信", en: "Enable Discord communication" }, type: "boolean" },
            
            { key: "plugins.entries.whatsapp.enabled", label: { zh: "WhatsApp - 插件状态", en: "WhatsApp Plugin" }, desc: { zh: "启用 WhatsApp 插件", en: "Enable WhatsApp Plugin" }, type: "boolean" }
        ]
    },
    {
        id: "security",
        label: { zh: "系统安全策略", en: "Security & Permissions" },
        items: [
            { key: "commands.bash", label: { zh: "终端执行 (!)", en: "Bash Command (!)" }, desc: { zh: "允许执行 Shell 命令", en: "Allow Shell command execution" }, type: "boolean" },
            { key: "commands.config", label: { zh: "动态配置 (/config)", en: "Dynamic Config (/config)" }, desc: { zh: "允许在对话中修改配置", en: "Allow editing config via chat" }, type: "boolean" },
            { key: "tools.exec.security", label: { zh: "执行安全等级", en: "Execution Security" }, desc: { zh: "deny/allowlist/full", en: "Execution security level" }, type: "enum", options: ["deny", "allowlist", "full"] }
        ]
    }
];
