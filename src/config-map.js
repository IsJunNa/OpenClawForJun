/**
 * OpenClawForJun 全量配置映射定义
 * 修正版 - 符合 OpenClaw 官方配置规范
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
                desc: { zh: "选择 AI 使用的核心模型", en: "Core model for AI" },
                type: "enum",
                options: [
                    "anthropic/claude-sonnet-4-5-20250929",
                    "anthropic/claude-opus-4-5",
                    "openai/gpt-5.2",
                    "openai/gpt-5-mini",
                    "google/gemini-3-pro-preview",
                    "google/gemini-3-flash-preview",
                    "ollama/llama3",
                    "自定义 (Manual)"
                ]
            },
            {
                key: "agents.defaults.model.fallbacks",
                label: { zh: "备份 AI 模型", en: "Fallback Models" },
                desc: { zh: "主模型不可用时切换", en: "Switch when primary fails" },
                type: "enum",
                isArray: true,
                options: [
                    "google/gemini-3-flash-preview",
                    "openai/gpt-5-mini",
                    "自定义 (Manual)"
                ]
            },
            {
                key: "agents.defaults.thinkingDefault",
                label: { zh: "思考深度", en: "Thinking Depth" },
                type: "enum",
                options: ["off", "low", "medium", "high"]
            },
            {
                key: "agents.defaults.userTimezone",
                label: { zh: "用户时区", en: "Timezone" },
                type: "enum",
                options: ["Asia/Shanghai", "Asia/Hong_Kong", "America/New_York", "UTC"]
            },
            {
                key: "agents.defaults.workspace",
                label: { zh: "工作目录", en: "Workspace" },
                type: "string"
            },
            {
                key: "agents.defaults.timeoutSeconds",
                label: { zh: "超时时间(秒)", en: "Timeout (s)" },
                type: "string"
            },
            {
                key: "agents.defaults.maxConcurrent",
                label: { zh: "最大并发数", en: "Max Concurrent" },
                type: "string"
            }
        ]
    },

    // ==================== 2. 通信频道管理 ====================
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Channels" },
        isCategory: true,
        subCategories: [
            // -- WhatsApp --
            {
                id: "whatsapp",
                label: { zh: "WhatsApp", en: "WhatsApp" },
                specialActions: [
                    { id: "login", label: { zh: "扫码登录", en: "Scan QR Login" }, command: "openclaw channels login" }
                ],
                items: [
                    { key: "channels.whatsapp.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.whatsapp.allowFrom", label: { zh: "允许的号码", en: "Allowed Numbers" }, type: "string", isArray: true, desc: { zh: "+8613800138000", en: "+8613800138000" } },
                    { key: "channels.whatsapp.sendReadReceipts", label: { zh: "发送已读回执", en: "Read Receipts" }, type: "boolean" }
                ]
            },
            // -- Telegram --
            {
                id: "tg",
                label: { zh: "Telegram", en: "Telegram" },
                items: [
                    { key: "channels.telegram.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string", desc: { zh: "从 @BotFather 获取", en: "Get from @BotFather" } },
                    { key: "channels.telegram.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.telegram.allowFrom", label: { zh: "允许的用户 ID", en: "Allowed IDs" }, type: "string", isArray: true }
                ]
            },
            // -- Discord --
            {
                id: "discord",
                label: { zh: "Discord", en: "Discord" },
                items: [
                    { key: "channels.discord.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string" },
                    { key: "channels.discord.guildIds", label: { zh: "服务器 ID", en: "Guild IDs" }, type: "string", isArray: true },
                    { key: "channels.discord.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] }
                ]
            },
            // -- Slack --
            {
                id: "slack",
                label: { zh: "Slack", en: "Slack" },
                items: [
                    { key: "channels.slack.appToken", label: { zh: "App Token", en: "App Token" }, type: "string" },
                    { key: "channels.slack.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string" }
                ]
            },
            // -- Signal --
            {
                id: "signal",
                label: { zh: "Signal", en: "Signal" },
                items: [
                    { key: "channels.signal.phoneNumber", label: { zh: "绑定手机号", en: "Phone Number" }, type: "string" },
                    { key: "channels.signal.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] }
                ]
            },
            // -- Mattermost --
            {
                id: "mattermost",
                label: { zh: "Mattermost", en: "Mattermost" },
                items: [
                    { key: "channels.mattermost.serverUrl", label: { zh: "服务器地址", en: "Server URL" }, type: "string" },
                    { key: "channels.mattermost.botToken", label: { zh: "Bot Token", en: "Bot Token" }, type: "string" }
                ]
            },
            // -- iMessage --
            {
                id: "imessage",
                label: { zh: "iMessage (macOS)", en: "iMessage" },
                items: [
                    { key: "channels.imessage.dmPolicy", label: { zh: "DM 策略", en: "DM Policy" }, type: "enum", options: ["open", "allowlist", "deny"] },
                    { key: "channels.imessage.allowFrom", label: { zh: "允许的联系人", en: "Allowed Contacts" }, type: "string", isArray: true, desc: { zh: "dmPolicy=open 时填 *", en: "* for open policy" } }
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
                label: { zh: "DM 会话隔离", en: "DM Scope" },
                type: "enum",
                options: ["main", "per-peer", "per-channel-peer"]
            },
            {
                key: "session.mainKey",
                label: { zh: "主会话标识", en: "Main Key" },
                type: "string",
                desc: { zh: "默认 main", en: "Default: main" }
            },
            {
                key: "session.reset.mode",
                label: { zh: "重置模式", en: "Reset Mode" },
                type: "enum",
                options: ["daily", "idle"]
            },
            {
                key: "session.reset.idleMinutes",
                label: { zh: "空闲重置(分钟)", en: "Idle Minutes" },
                type: "string"
            }
        ]
    },

    // ==================== 4. 浏览器控制 ====================
    {
        id: "browser",
        label: { zh: "浏览器控制", en: "Browser" },
        items: [
            { key: "browser.enabled", label: { zh: "启用浏览器", en: "Enable" }, type: "boolean" },
            { key: "browser.headless", label: { zh: "无头模式", en: "Headless" }, type: "boolean" },
            { key: "browser.defaultProfile", label: { zh: "默认配置", en: "Profile" }, type: "string" }
        ]
    },

    // ==================== 5. 技能扩展 ====================
    {
        id: "skills",
        label: { zh: "技能扩展", en: "Skills" },
        items: [
            { key: "skills.install.preferBrew", label: { zh: "优先 Brew", en: "Prefer Brew" }, type: "boolean" },
            { key: "skills.install.nodeManager", label: { zh: "包管理器", en: "Node Manager" }, type: "enum", options: ["npm", "pnpm", "yarn"] }
        ]
    },

    // ==================== 6. 定时任务 ====================
    {
        id: "cron",
        label: { zh: "定时任务", en: "Cron Jobs" },
        items: [
            { key: "cron.enabled", label: { zh: "启用", en: "Enable" }, type: "boolean" },
            { key: "cron.maxConcurrentRuns", label: { zh: "最大并发", en: "Max Runs" }, type: "string" }
        ]
    },

    // ==================== 7. 网关配置 ====================
    {
        id: "gateway",
        label: { zh: "网关配置", en: "Gateway" },
        specialActions: [
            { id: "start", label: { zh: "启动网关", en: "Start" }, command: "openclaw gateway start" },
            { id: "stop", label: { zh: "停止网关", en: "Stop" }, command: "openclaw gateway stop" },
            { id: "status", label: { zh: "查看状态", en: "Status" }, command: "openclaw status" },
            { id: "logs", label: { zh: "查看日志", en: "Logs" }, command: "openclaw logs -n 30" }
        ],
        items: [
            { key: "gateway.port", label: { zh: "端口", en: "Port" }, type: "string", desc: { zh: "默认 18789", en: "Default 18789" } },
            { key: "gateway.bind", label: { zh: "绑定模式", en: "Bind" }, type: "enum", options: ["loopback", "tailnet", "lan"] },
            { key: "gateway.token", label: { zh: "认证 Token", en: "Token" }, type: "string" }
        ]
    },

    // ==================== 8. 安全配置 ====================
    {
        id: "security",
        label: { zh: "安全配置", en: "Security" },
        items: [
            {
                key: "agents.defaults.sandbox.mode",
                label: { zh: "沙箱模式", en: "Sandbox" },
                type: "enum",
                options: ["off", "non-main", "all"]
            },
            {
                key: "tools.exec.security",
                label: { zh: "执行安全", en: "Exec Security" },
                type: "enum",
                options: ["deny", "allowlist", "full"]
            }
        ]
    },

    // ==================== 9. 消息配置 ====================
    {
        id: "messages",
        label: { zh: "消息配置", en: "Messages" },
        items: [
            { key: "messages.groupChat.requireMention", label: { zh: "群聊必须@", en: "Require Mention" }, type: "boolean" },
            { key: "messages.groupChat.mentionPatterns", label: { zh: "提及模式", en: "Patterns" }, type: "string", isArray: true }
        ]
    },

    // ==================== 10. 日志配置 ====================
    {
        id: "logging",
        label: { zh: "日志配置", en: "Logging" },
        items: [
            { key: "logging.level", label: { zh: "日志级别", en: "Level" }, type: "enum", options: ["error", "warn", "info", "debug"] },
            { key: "logging.redactSecrets", label: { zh: "隐藏敏感信息", en: "Redact" }, type: "boolean" }
        ]
    }
];
