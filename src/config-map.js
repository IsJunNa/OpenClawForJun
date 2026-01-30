/**
 * OpenClawForJun 全量配置映射定义
 * 完整功能版 - 基于 OpenClaw 官方文档
 */

module.exports = [
    // ==================== 1. 基础核心设置 ====================
    {
        id: "core",
        label: { zh: "基础核心设置", en: "Core Settings" },
        items: [
            {
                key: "agents.defaults.model.primary",
                label: { zh: "主 AI 模型", en: "Primary AI Model" },
                desc: { zh: "选择 AI 使用的核心模型", en: "Core model for AI responses" },
                type: "enum",
                needsKey: true,
                options: [
                    "anthropic/claude-sonnet-4-5-20250929",
                    "anthropic/claude-opus-4-5",
                    "openai/gpt-5.2",
                    "openai/gpt-5-mini",
                    "google/gemini-3-pro-preview",
                    "google/gemini-3-flash-preview",
                    "google-gemini-cli/gemini-3-flash-preview",
                    "google-gemini-cli/gemini-3-pro-preview",
                    "ollama/llama3",
                    "minimax/MiniMax-M2.1",
                    "zai/glm-4.7",
                    "自定义输入 (Manual)"
                ]
            },
            {
                key: "agents.defaults.model.fallbacks",
                label: { zh: "备份 AI 模型", en: "Fallback AI Model" },
                desc: { zh: "主模型不可用时自动切换", en: "Auto-switch when primary fails" },
                type: "enum",
                isArray: true,
                options: [
                    "google/gemini-3-flash-preview",
                    "openai/gpt-5-mini",
                    "openrouter/deepseek/deepseek-r1:free",
                    "openrouter/meta-llama/llama-3.3-70b-instruct:free",
                    "自定义输入 (Manual)"
                ]
            },
            {
                key: "agents.defaults.imageModel.primary",
                label: { zh: "图像识别模型", en: "Image Model" },
                desc: { zh: "处理图像的视觉模型", en: "Model for image processing" },
                type: "enum",
                options: [
                    "openrouter/qwen/qwen-2.5-vl-72b-instruct:free",
                    "openrouter/google/gemini-2.0-flash-vision:free",
                    "anthropic/claude-sonnet-4-5-20250929",
                    "自定义输入 (Manual)"
                ]
            },
            {
                key: "agents.defaults.thinkingDefault",
                label: { zh: "思考深度", en: "Thinking Depth" },
                desc: { zh: "模型推理级别", en: "Reasoning level" },
                type: "enum",
                options: ["off", "low", "medium", "high", "xhigh"]
            },
            {
                key: "agents.defaults.userTimezone",
                label: { zh: "用户时区", en: "User Timezone" },
                desc: { zh: "时间显示时区", en: "Timezone for time display" },
                type: "enum",
                options: ["Asia/Shanghai", "Asia/Hong_Kong", "Asia/Tokyo", "America/New_York", "America/Los_Angeles", "Europe/London", "UTC"]
            },
            {
                key: "agents.defaults.timeFormat",
                label: { zh: "时间格式", en: "Time Format" },
                desc: { zh: "时间显示格式", en: "Time display format" },
                type: "enum",
                options: ["12h", "24h"]
            },
            {
                key: "agents.defaults.workspace",
                label: { zh: "工作目录", en: "Workspace" },
                desc: { zh: "AI 工作文件存储目录", en: "Directory for AI workspace" },
                type: "string"
            },
            {
                key: "agents.defaults.timeoutSeconds",
                label: { zh: "超时时间 (秒)", en: "Timeout (seconds)" },
                desc: { zh: "操作超时秒数", en: "Operation timeout" },
                type: "string"
            },
            {
                key: "agents.defaults.maxConcurrent",
                label: { zh: "最大并发数", en: "Max Concurrent" },
                desc: { zh: "同时处理的最大请求数", en: "Max concurrent requests" },
                type: "string"
            },
            {
                key: "agents.defaults.contextTokens",
                label: { zh: "上下文 Token 限制", en: "Context Tokens" },
                desc: { zh: "最大上下文长度", en: "Max context length" },
                type: "string"
            }
        ]
    },

    // ==================== 2. 通信频道管理 ====================
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Messaging Channels" },
        isCategory: true,
        subCategories: [
            // -- WhatsApp --
            {
                id: "whatsapp",
                label: { zh: "WhatsApp", en: "WhatsApp" },
                specialActions: [
                    { id: "login", label: { zh: "📱 扫码登录绑定", en: "📱 Scan QR to Login" }, command: "openclaw whatsapp login" },
                    { id: "logout", label: { zh: "🚪 登出 WhatsApp", en: "🚪 Logout WhatsApp" }, command: "openclaw whatsapp logout" }
                ],
                items: [
                    { key: "channels.whatsapp.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.whatsapp.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.whatsapp.allowFrom", label: { zh: "允许的号码", en: "Allowed Numbers" }, type: "string", isArray: true, desc: { zh: "格式: +8613800138000", en: "Format: +8613800138000" } },
                    { key: "channels.whatsapp.sendReadReceipts", label: { zh: "发送已读回执", en: "Send Read Receipts" }, type: "boolean" }
                ]
            },
            // -- Telegram --
            {
                id: "tg",
                label: { zh: "Telegram", en: "Telegram" },
                items: [
                    { key: "channels.telegram.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.telegram.botToken", label: { zh: "机器人令牌", en: "Bot Token" }, type: "string", desc: { zh: "从 @BotFather 获取", en: "Get from @BotFather" } },
                    { key: "channels.telegram.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.telegram.allowFrom", label: { zh: "允许的用户 ID", en: "Allowed User IDs" }, type: "string", isArray: true },
                    { key: "channels.telegram.allowGroups", label: { zh: "允许的群组 ID", en: "Allowed Group IDs" }, type: "string", isArray: true }
                ]
            },
            // -- Discord --
            {
                id: "discord",
                label: { zh: "Discord", en: "Discord" },
                items: [
                    { key: "channels.discord.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.discord.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string", desc: { zh: "Discord 开发者门户获取", en: "From Discord Developer Portal" } },
                    { key: "channels.discord.guildIds", label: { zh: "服务器 ID 列表", en: "Guild IDs" }, type: "string", isArray: true },
                    { key: "channels.discord.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.discord.allowFrom", label: { zh: "允许的用户 ID", en: "Allowed User IDs" }, type: "string", isArray: true }
                ]
            },
            // -- Slack --
            {
                id: "slack",
                label: { zh: "Slack", en: "Slack" },
                items: [
                    { key: "channels.slack.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.slack.appToken", label: { zh: "App Token", en: "App Token" }, type: "string" },
                    { key: "channels.slack.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string" },
                    { key: "channels.slack.signingSecret", label: { zh: "Signing Secret", en: "Signing Secret" }, type: "string" }
                ]
            },
            // -- Signal --
            {
                id: "signal",
                label: { zh: "Signal", en: "Signal" },
                items: [
                    { key: "channels.signal.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.signal.phoneNumber", label: { zh: "绑定手机号", en: "Phone Number" }, type: "string" },
                    { key: "channels.signal.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] }
                ]
            },
            // -- Mattermost --
            {
                id: "mattermost",
                label: { zh: "Mattermost", en: "Mattermost" },
                items: [
                    { key: "channels.mattermost.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.mattermost.serverUrl", label: { zh: "服务器地址", en: "Server URL" }, type: "string" },
                    { key: "channels.mattermost.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string" },
                    { key: "channels.mattermost.teamId", label: { zh: "团队 ID", en: "Team ID" }, type: "string" }
                ]
            },
            // -- iMessage (macOS) --
            {
                id: "imessage",
                label: { zh: "iMessage (macOS)", en: "iMessage (macOS)" },
                items: [
                    { key: "channels.imessage.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.imessage.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.imessage.allowFrom", label: { zh: "允许的联系人", en: "Allowed Contacts" }, type: "string", isArray: true }
                ]
            },
            // -- Google Chat --
            {
                id: "googlechat",
                label: { zh: "Google Chat", en: "Google Chat" },
                items: [
                    { key: "channels.googlechat.enabled", label: { zh: "启用频道", en: "Enable Channel" }, type: "boolean" },
                    { key: "channels.googlechat.webhookUrl", label: { zh: "Webhook URL", en: "Webhook URL" }, type: "string" },
                    { key: "channels.googlechat.serviceAccountPath", label: { zh: "服务账号 JSON 路径", en: "Service Account Path" }, type: "string" }
                ]
            }
        ]
    },

    // ==================== 3. 会话管理 ====================
    {
        id: "sessions",
        label: { zh: "会话管理", en: "Sessions" },
        items: [
            {
                key: "session.dmScope",
                label: { zh: "DM 会话隔离模式", en: "DM Session Scope" },
                desc: { zh: "控制私聊会话如何隔离", en: "How DM sessions are isolated" },
                type: "enum",
                options: ["main", "per-peer", "per-channel-peer", "per-account-channel-peer"]
            },
            {
                key: "session.mainKey",
                label: { zh: "主会话标识", en: "Main Session Key" },
                type: "string",
                desc: { zh: "默认 'main'", en: "Default 'main'" }
            },
            {
                key: "session.reset.mode",
                label: { zh: "会话重置模式", en: "Reset Mode" },
                type: "enum",
                options: ["daily", "idle"]
            },
            {
                key: "session.reset.atHour",
                label: { zh: "每日重置时间 (0-23)", en: "Daily Reset Hour (0-23)" },
                type: "string"
            },
            {
                key: "session.reset.idleMinutes",
                label: { zh: "空闲重置分钟数", en: "Idle Reset Minutes" },
                type: "string"
            },
            {
                key: "session.heartbeatIdleMinutes",
                label: { zh: "心跳空闲分钟数", en: "Heartbeat Idle Minutes" },
                type: "string"
            }
        ]
    },

    // ==================== 4. 浏览器控制 ====================
    {
        id: "browser",
        label: { zh: "浏览器控制", en: "Browser Control" },
        items: [
            { key: "browser.enabled", label: { zh: "启用浏览器控制", en: "Enable Browser" }, type: "boolean" },
            { key: "browser.evaluateEnabled", label: { zh: "启用 JS 执行", en: "Enable JS Evaluate" }, type: "boolean", desc: { zh: "允许执行 JavaScript", en: "Allow JS execution" } },
            { key: "browser.headless", label: { zh: "无头模式", en: "Headless Mode" }, type: "boolean" },
            { key: "browser.defaultProfile", label: { zh: "默认浏览器配置", en: "Default Profile" }, type: "string" },
            {
                key: "browser.color",
                label: { zh: "边框颜色", en: "Border Color" },
                type: "string",
                desc: { zh: "HEX 格式 #FF4500", en: "HEX format #FF4500" }
            },
            { key: "browser.executablePath", label: { zh: "浏览器路径", en: "Executable Path" }, type: "string", desc: { zh: "自定义浏览器可执行文件路径", en: "Custom browser executable path" } }
        ]
    },

    // ==================== 5. 技能与插件 ====================
    {
        id: "skills",
        label: { zh: "技能扩展", en: "Skills & Plugins" },
        isCategory: true,
        subCategories: [
            {
                id: "skills_builtin",
                label: { zh: "内置技能", en: "Built-in Skills" },
                items: [
                    { key: "skills.entries.peekaboo.enabled", label: { zh: "Peekaboo 截图", en: "Peekaboo Screenshot" }, type: "boolean" },
                    { key: "skills.entries.gemini.enabled", label: { zh: "Gemini AI", en: "Gemini AI" }, type: "boolean" },
                    { key: "skills.entries.sag.enabled", label: { zh: "SAG 技能", en: "SAG Skill" }, type: "boolean" },
                    { key: "skills.entries.nano-banana-pro.enabled", label: { zh: "Nano Banana Pro", en: "Nano Banana Pro" }, type: "boolean" },
                    { key: "skills.entries.nano-banana-pro.apiKey", label: { zh: "Nano Banana API Key", en: "Nano Banana API Key" }, type: "string" }
                ]
            },
            {
                id: "skills_config",
                label: { zh: "技能设置", en: "Skills Config" },
                items: [
                    { key: "skills.install.preferBrew", label: { zh: "优先使用 Brew 安装", en: "Prefer Brew Install" }, type: "boolean" },
                    { key: "skills.install.nodeManager", label: { zh: "Node 包管理器", en: "Node Manager" }, type: "enum", options: ["npm", "pnpm", "yarn"] },
                    { key: "skills.load.extraDirs", label: { zh: "额外技能目录", en: "Extra Skill Dirs" }, type: "string", isArray: true }
                ]
            },
            {
                id: "plugins_config",
                label: { zh: "插件管理", en: "Plugins" },
                items: [
                    { key: "plugins.enabled", label: { zh: "启用插件系统", en: "Enable Plugins" }, type: "boolean" },
                    { key: "plugins.allow", label: { zh: "允许的插件 ID", en: "Allowed Plugin IDs" }, type: "string", isArray: true },
                    { key: "plugins.deny", label: { zh: "禁用的插件 ID", en: "Denied Plugin IDs" }, type: "string", isArray: true }
                ]
            }
        ]
    },

    // ==================== 6. 自动化任务 ====================
    {
        id: "automation",
        label: { zh: "自动化任务", en: "Automation" },
        isCategory: true,
        subCategories: [
            {
                id: "cron",
                label: { zh: "定时任务 (Cron)", en: "Cron Jobs" },
                items: [
                    { key: "cron.enabled", label: { zh: "启用定时任务", en: "Enable Cron" }, type: "boolean" },
                    { key: "cron.maxConcurrentRuns", label: { zh: "最大并发任务数", en: "Max Concurrent Runs" }, type: "string" }
                ]
            },
            {
                id: "webhooks",
                label: { zh: "Webhooks", en: "Webhooks" },
                items: [
                    { key: "hooks.enabled", label: { zh: "启用 Webhooks", en: "Enable Webhooks" }, type: "boolean" },
                    { key: "hooks.endpoints", label: { zh: "Webhook 端点", en: "Webhook Endpoints" }, type: "string", isArray: true }
                ]
            }
        ]
    },

    // ==================== 7. 网关配置 ====================
    {
        id: "gateway",
        label: { zh: "网关配置", en: "Gateway" },
        specialActions: [
            { id: "start", label: { zh: "🚀 启动网关", en: "🚀 Start Gateway" }, command: "openclaw gateway start" },
            { id: "stop", label: { zh: "🛑 停止网关", en: "🛑 Stop Gateway" }, command: "openclaw gateway stop" },
            { id: "status", label: { zh: "📊 查看状态", en: "📊 Check Status" }, command: "openclaw status" },
            { id: "logs", label: { zh: "📜 查看日志", en: "📜 View Logs" }, command: "openclaw logs -n 50" }
        ],
        items: [
            { key: "gateway.port", label: { zh: "端口", en: "Port" }, type: "string", desc: { zh: "默认 18789", en: "Default 18789" } },
            { key: "gateway.bind", label: { zh: "绑定模式", en: "Bind Mode" }, type: "enum", options: ["loopback", "tailnet", "lan"] },
            { key: "gateway.token", label: { zh: "认证 Token", en: "Auth Token" }, type: "string", desc: { zh: "非 loopback 必填", en: "Required for non-loopback" } },
            { key: "gateway.reload.enabled", label: { zh: "热重载", en: "Hot Reload" }, type: "boolean" },
            { key: "canvasHost.enabled", label: { zh: "Canvas Host 启用", en: "Enable Canvas Host" }, type: "boolean" },
            { key: "canvasHost.port", label: { zh: "Canvas Host 端口", en: "Canvas Host Port" }, type: "string", desc: { zh: "默认 18793", en: "Default 18793" } }
        ]
    },

    // ==================== 8. 安全与权限控制 ====================
    {
        id: "security",
        label: { zh: "安全与权限控制", en: "Security & Permissions" },
        items: [
            {
                key: "agents.defaults.sandbox.mode",
                label: { zh: "沙箱模式", en: "Sandbox Mode" },
                desc: { zh: "限制非主会话的权限", en: "Limit permissions for non-main sessions" },
                type: "enum",
                options: ["off", "non-main", "all"]
            },
            {
                key: "agents.defaults.sandbox.allowedPaths",
                label: { zh: "沙箱允许路径", en: "Sandbox Allowed Paths" },
                type: "string",
                isArray: true
            },
            {
                key: "tools.exec.security",
                label: { zh: "执行安全等级", en: "Exec Security Level" },
                desc: { zh: "控制 shell 命令执行权限", en: "Control shell command permissions" },
                type: "enum",
                options: ["deny", "allowlist", "full"]
            },
            {
                key: "tools.exec.allowlist",
                label: { zh: "允许的命令列表", en: "Allowed Commands" },
                type: "string",
                isArray: true,
                desc: { zh: "仅在 allowlist 模式有效", en: "Only effective in allowlist mode" }
            },
            {
                key: "commands.bash",
                label: { zh: "终端执行 (高危)", en: "Bash Command (High Risk)" },
                desc: { zh: "允许执行 shell 命令", en: "Allow shell command execution" },
                type: "boolean"
            },
            {
                key: "agents.defaults.elevatedDefault",
                label: { zh: "默认提权模式", en: "Default Elevated Mode" },
                type: "enum",
                options: ["off", "on"]
            }
        ]
    },

    // ==================== 9. 认证配置 ====================
    {
        id: "auth",
        label: { zh: "API 认证", en: "API Authentication" },
        items: [
            {
                key: "auth.profiles.default.mode",
                label: { zh: "认证模式", en: "Auth Mode" },
                type: "enum",
                options: ["api_key", "oauth", "oauth_pkce"]
            },
            {
                key: "auth.profiles.default.provider",
                label: { zh: "API 提供商", en: "API Provider" },
                type: "enum",
                options: ["anthropic", "openai", "google", "openrouter", "ollama"]
            },
            {
                key: "auth.profiles.default.apiKey",
                label: { zh: "API Key", en: "API Key" },
                type: "string"
            }
        ]
    },

    // ==================== 10. 消息配置 ====================
    {
        id: "messages",
        label: { zh: "消息配置", en: "Messages" },
        items: [
            {
                key: "messages.groupChat.mentionPatterns",
                label: { zh: "群聊提及模式", en: "Group Mention Patterns" },
                type: "string",
                isArray: true,
                desc: { zh: "如: @openclaw", en: "e.g., @openclaw" }
            },
            {
                key: "messages.groupChat.requireMention",
                label: { zh: "群聊必须 @", en: "Require Mention in Groups" },
                type: "boolean"
            },
            {
                key: "messages.inbound.maxChars",
                label: { zh: "入站消息最大字符", en: "Inbound Max Chars" },
                type: "string"
            },
            {
                key: "messages.queue.concurrency",
                label: { zh: "消息队列并发数", en: "Queue Concurrency" },
                type: "string"
            }
        ]
    },

    // ==================== 11. 日志配置 ====================
    {
        id: "logging",
        label: { zh: "日志配置", en: "Logging" },
        items: [
            {
                key: "logging.level",
                label: { zh: "日志级别", en: "Log Level" },
                type: "enum",
                options: ["error", "warn", "info", "debug", "trace"]
            },
            {
                key: "logging.redactSecrets",
                label: { zh: "隐藏敏感信息", en: "Redact Secrets" },
                type: "boolean"
            },
            {
                key: "logging.includeTimestamps",
                label: { zh: "包含时间戳", en: "Include Timestamps" },
                type: "boolean"
            }
        ]
    },

    // ==================== 12. UI 外观 ====================
    {
        id: "ui",
        label: { zh: "UI 外观", en: "UI Appearance" },
        items: [
            {
                key: "ui.seamColor",
                label: { zh: "边框颜色", en: "Seam Color" },
                type: "string",
                desc: { zh: "HEX 格式 #FF4500", en: "HEX format #FF4500" }
            },
            {
                key: "ui.assistant.name",
                label: { zh: "助手名称", en: "Assistant Name" },
                type: "string"
            },
            {
                key: "ui.assistant.avatar",
                label: { zh: "助手头像", en: "Assistant Avatar" },
                type: "string",
                desc: { zh: "Emoji 或 URL", en: "Emoji or URL" }
            }
        ]
    }
];
