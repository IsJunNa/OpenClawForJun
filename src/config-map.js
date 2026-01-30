/**
 * OpenClawForJun 配置映射定义
 * 包含中英文双语支持
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
                desc: { zh: "如 Asia/Shanghai", en: "e.g., Asia/Shanghai" }, 
                type: "string" 
            }
        ]
    },
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Messaging Channels" },
        items: [
            { key: "channels.telegram.enabled", label: { zh: "Telegram - 状态", en: "Telegram - Enabled" }, desc: { zh: "启用机器人频道", en: "Enable TG Bot" }, type: "boolean" },
            { key: "channels.telegram.botToken", label: { zh: "Telegram - 令牌", en: "Telegram - Token" }, desc: { zh: "Bot Token", en: "Bot Token" }, type: "string" },
            { key: "channels.telegram.dmPolicy", label: { zh: "Telegram - 私聊策略", en: "Telegram - DM Policy" }, desc: { zh: "访问控制模式", en: "Access control policy" }, type: "enum", options: ["pairing", "allowlist", "open"] },
            { key: "channels.discord.enabled", label: { zh: "Discord - 状态", en: "Discord - Enabled" }, desc: { zh: "启用 Discord 接入", en: "Enable Discord Bot" }, type: "boolean" },
            { key: "channels.discord.token", label: { zh: "Discord - 令牌", en: "Discord - Token" }, desc: { zh: "Bot Token", en: "Bot Token" }, type: "string" },
            { key: "channels.whatsapp.enabled", label: { zh: "WhatsApp - 状态", en: "WhatsApp - Enabled" }, desc: { zh: "启用 WhatsApp 接入", en: "Enable WhatsApp" }, type: "boolean" }
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
