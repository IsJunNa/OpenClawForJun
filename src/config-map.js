/**
 * OpenClawForJun 完整配置映射
 * 每个配置项都有详细说明
 */

module.exports = [
    // ==================== 基础核心 ====================
    {
        id: "core",
        label: { zh: "基础核心", en: "Core" },
        items: [
            {
                key: "agents.defaults.model.primary",
                label: { zh: "主模型", en: "Primary Model" },
                desc: { zh: "AI 使用的主要模型，影响回复质量和速度", en: "Main AI model for responses" },
                type: "enum",
                needsApiKey: true,
                options: [
                    "anthropic/claude-sonnet-4-5-20250929",
                    "anthropic/claude-opus-4-5",
                    "anthropic/claude-3-5-sonnet",
                    "openai/gpt-5.2",
                    "openai/gpt-4o",
                    "openai/gpt-4-turbo",
                    "google/gemini-3-pro-preview",
                    "google/gemini-3-flash-preview",
                    "google/gemini-2.0-flash",
                    "google/gemini-1.5-pro",
                    "deepseek/deepseek-chat",
                    "deepseek/deepseek-coder",
                    "ollama/llama3",
                    "ollama/qwen2",
                    "自定义"
                ]
            },
            {
                key: "agents.defaults.model.fallbacks",
                label: { zh: "备用模型", en: "Fallback" },
                desc: { zh: "主模型失败时自动切换的备选模型", en: "Backup when primary fails" },
                type: "enum",
                isArray: true,
                needsApiKey: true,
                options: [
                    "google/gemini-3-flash-preview",
                    "google/gemini-2.0-flash",
                    "openai/gpt-4o-mini",
                    "openai/gpt-4-turbo",
                    "anthropic/claude-3-5-sonnet",
                    "deepseek/deepseek-chat",
                    "ollama/llama3",
                    "自定义"
                ]
            },
            {
                key: "agents.defaults.thinkingDefault",
                label: { zh: "思考深度", en: "Thinking" },
                desc: { zh: "模型思考的深度，高=更准确但慢", en: "Reasoning depth, high=accurate but slow" },
                type: "enum",
                options: ["off", "low", "medium", "high"]
            },
            {
                key: "agents.defaults.userTimezone",
                label: { zh: "时区", en: "Timezone" },
                desc: { zh: "用于日期时间的显示和定时任务", en: "For time display and cron jobs" },
                type: "enum",
                options: ["Asia/Shanghai", "Asia/Hong_Kong", "America/New_York", "UTC"]
            },
            {
                key: "agents.defaults.workspace",
                label: { zh: "工作目录", en: "Workspace" },
                desc: { zh: "AI 读写文件的根目录，建议 ~/.openclaw/workspace", en: "Root dir for AI file operations" },
                type: "string"
            },
            {
                key: "agents.defaults.timeoutSeconds",
                label: { zh: "超时(秒)", en: "Timeout" },
                desc: { zh: "单次操作的最大等待时间", en: "Max wait time per operation" },
                type: "string"
            }
        ]
    },

    // ==================== 通信频道 ====================
    {
        id: "channels",
        label: { zh: "通信频道", en: "Channels" },
        isCategory: true,
        subCategories: [
            {
                id: "whatsapp",
                label: { zh: "WhatsApp", en: "WhatsApp" },
                specialActions: [
                    { id: "login", label: { zh: "扫码登录", en: "QR Login" }, command: "openclaw channels login" }
                ],
                items: [
                    {
                        key: "channels.whatsapp.dmPolicy",
                        label: { zh: "私信策略", en: "DM Policy" },
                        desc: { zh: "open=任何人可私聊, allowlist=仅白名单, deny=禁止", en: "Who can DM you" },
                        type: "enum",
                        options: ["open", "allowlist", "deny"]
                    },
                    {
                        key: "channels.whatsapp.allowFrom",
                        label: { zh: "白名单", en: "Allow List" },
                        desc: { zh: "允许私聊的手机号，格式 +8613800138000", en: "Allowed phone numbers" },
                        type: "string",
                        isArray: true
                    },
                    {
                        key: "channels.whatsapp.sendReadReceipts",
                        label: { zh: "已读回执", en: "Read Receipts" },
                        desc: { zh: "是否发送已读状态给对方", en: "Send read status" },
                        type: "boolean"
                    }
                ]
            },
            {
                id: "tg",
                label: { zh: "Telegram", en: "Telegram" },
                items: [
                    {
                        key: "channels.telegram.botToken",
                        label: { zh: "Bot Token", en: "Bot Token" },
                        desc: { zh: "从 @BotFather 创建机器人后获取的令牌", en: "Token from @BotFather" },
                        type: "string"
                    },
                    {
                        key: "channels.telegram.dmPolicy",
                        label: { zh: "私信策略", en: "DM Policy" },
                        desc: { zh: "谁可以和机器人私聊", en: "Who can DM the bot" },
                        type: "enum",
                        options: ["open", "allowlist", "deny"]
                    },
                    {
                        key: "channels.telegram.allowFrom",
                        label: { zh: "白名单", en: "Allow List" },
                        desc: { zh: "允许的 Telegram 用户 ID 数字", en: "Allowed user IDs" },
                        type: "string",
                        isArray: true
                    }
                ]
            },
            {
                id: "discord",
                label: { zh: "Discord", en: "Discord" },
                items: [
                    {
                        key: "channels.discord.botToken",
                        label: { zh: "Bot Token", en: "Bot Token" },
                        desc: { zh: "Discord 开发者门户 > 应用 > Bot 页面获取", en: "From Discord Developer Portal" },
                        type: "string"
                    },
                    {
                        key: "channels.discord.guildIds",
                        label: { zh: "服务器 ID", en: "Guild IDs" },
                        desc: { zh: "机器人允许运行的服务器，右键服务器复制 ID", en: "Servers where bot runs" },
                        type: "string",
                        isArray: true
                    }
                ]
            },
            {
                id: "slack",
                label: { zh: "Slack", en: "Slack" },
                items: [
                    {
                        key: "channels.slack.appToken",
                        label: { zh: "App Token", en: "App Token" },
                        desc: { zh: "xapp- 开头的应用级令牌", en: "xapp- prefixed token" },
                        type: "string"
                    },
                    {
                        key: "channels.slack.botToken",
                        label: { zh: "Bot Token", en: "Bot Token" },
                        desc: { zh: "xoxb- 开头的机器人令牌", en: "xoxb- prefixed token" },
                        type: "string"
                    }
                ]
            },
            {
                id: "signal",
                label: { zh: "Signal", en: "Signal" },
                items: [
                    {
                        key: "channels.signal.phoneNumber",
                        label: { zh: "手机号", en: "Phone" },
                        desc: { zh: "Signal 账号绑定的手机号", en: "Signal account phone" },
                        type: "string"
                    }
                ]
            },
            {
                id: "mattermost",
                label: { zh: "Mattermost", en: "Mattermost" },
                items: [
                    {
                        key: "channels.mattermost.serverUrl",
                        label: { zh: "服务器", en: "Server" },
                        desc: { zh: "Mattermost 服务器地址，如 https://mm.company.com", en: "Mattermost server URL" },
                        type: "string"
                    },
                    {
                        key: "channels.mattermost.botToken",
                        label: { zh: "Bot Token", en: "Bot Token" },
                        desc: { zh: "在集成管理中创建的机器人令牌", en: "Bot token from integrations" },
                        type: "string"
                    }
                ]
            },
            {
                id: "imessage",
                label: { zh: "iMessage", en: "iMessage" },
                items: [
                    {
                        key: "channels.imessage.dmPolicy",
                        label: { zh: "私信策略", en: "DM Policy" },
                        desc: { zh: "仅 macOS 有效，需要授权消息读取权限", en: "macOS only, needs permission" },
                        type: "enum",
                        options: ["open", "allowlist", "deny"]
                    },
                    {
                        key: "channels.imessage.allowFrom",
                        label: { zh: "白名单", en: "Allow List" },
                        desc: { zh: "policy=open 时填 * 表示所有人", en: "Use * for everyone when open" },
                        type: "string",
                        isArray: true
                    }
                ]
            }
        ]
    },

    // ==================== 会话管理 ====================
    {
        id: "sessions",
        label: { zh: "会话管理", en: "Sessions" },
        items: [
            {
                key: "session.dmScope",
                label: { zh: "隔离模式", en: "Scope" },
                desc: { zh: "main=共享会话, per-peer=每人独立会话", en: "main=shared, per-peer=isolated" },
                type: "enum",
                options: ["main", "per-peer", "per-channel-peer"]
            },
            {
                key: "session.reset.mode",
                label: { zh: "重置方式", en: "Reset" },
                desc: { zh: "daily=每天重置, idle=空闲后重置", en: "daily or idle reset" },
                type: "enum",
                options: ["daily", "idle"]
            },
            {
                key: "session.reset.idleMinutes",
                label: { zh: "空闲分钟", en: "Idle Min" },
                desc: { zh: "多少分钟不活动后重置会话", en: "Minutes before reset" },
                type: "string"
            }
        ]
    },

    // ==================== 浏览器 ====================
    {
        id: "browser",
        label: { zh: "浏览器控制", en: "Browser" },
        items: [
            {
                key: "browser.enabled",
                label: { zh: "启用", en: "Enable" },
                desc: { zh: "允许 AI 控制浏览器进行网页操作", en: "Allow AI to control browser" },
                type: "boolean"
            },
            {
                key: "browser.headless",
                label: { zh: "无头模式", en: "Headless" },
                desc: { zh: "开启=后台运行不显示窗口", en: "Run without visible window" },
                type: "boolean"
            }
        ]
    },

    // ==================== 定时任务 ====================
    {
        id: "cron",
        label: { zh: "定时任务", en: "Cron" },
        items: [
            {
                key: "cron.enabled",
                label: { zh: "启用", en: "Enable" },
                desc: { zh: "允许配置定时自动执行的任务", en: "Enable scheduled tasks" },
                type: "boolean"
            },
            {
                key: "cron.maxConcurrentRuns",
                label: { zh: "并发数", en: "Concurrent" },
                desc: { zh: "同时运行的最大任务数", en: "Max parallel tasks" },
                type: "string"
            }
        ]
    },

    // ==================== 网关 ====================
    {
        id: "gateway",
        label: { zh: "网关服务", en: "Gateway" },
        specialActions: [
            { id: "start", label: { zh: "启动", en: "Start" }, command: "openclaw gateway start" },
            { id: "stop", label: { zh: "停止", en: "Stop" }, command: "openclaw gateway stop" },
            { id: "status", label: { zh: "状态", en: "Status" }, command: "openclaw status" },
            { id: "logs", label: { zh: "日志", en: "Logs" }, command: "openclaw logs -n 30" }
        ],
        items: [
            {
                key: "gateway.port",
                label: { zh: "端口", en: "Port" },
                desc: { zh: "网关监听端口，默认 18789", en: "Default 18789" },
                type: "string"
            },
            {
                key: "gateway.bind",
                label: { zh: "绑定", en: "Bind" },
                desc: { zh: "loopback=仅本机, lan=局域网, tailnet=VPN", en: "Network binding mode" },
                type: "enum",
                options: ["loopback", "tailnet", "lan"]
            },
            {
                key: "gateway.token",
                label: { zh: "认证令牌", en: "Token" },
                desc: { zh: "非 loopback 模式必须设置认证令牌", en: "Required for non-loopback" },
                type: "string"
            }
        ]
    },

    // ==================== 安全 ====================
    {
        id: "security",
        label: { zh: "安全控制", en: "Security" },
        items: [
            {
                key: "agents.defaults.sandbox.mode",
                label: { zh: "沙箱", en: "Sandbox" },
                desc: { zh: "off=无限制, non-main=限制非主会话, all=全部限制", en: "Restriction level" },
                type: "enum",
                options: ["off", "non-main", "all"]
            },
            {
                key: "tools.exec.security",
                label: { zh: "命令执行", en: "Exec" },
                desc: { zh: "deny=禁止, allowlist=白名单, full=完全允许(危险)", en: "Shell command policy" },
                type: "enum",
                options: ["deny", "allowlist", "full"]
            }
        ]
    },

    // ==================== 消息 ====================
    {
        id: "messages",
        label: { zh: "消息规则", en: "Messages" },
        items: [
            {
                key: "messages.groupChat.requireMention",
                label: { zh: "群聊@", en: "Mention" },
                desc: { zh: "群聊中必须@机器人才响应", en: "Require @ in groups" },
                type: "boolean"
            },
            {
                key: "messages.groupChat.mentionPatterns",
                label: { zh: "@模式", en: "Patterns" },
                desc: { zh: "触发机器人的关键词，如 @claw", en: "Keywords to trigger, e.g. @claw" },
                type: "string",
                isArray: true
            }
        ]
    },

    // ==================== 日志 ====================
    {
        id: "logging",
        label: { zh: "日志", en: "Logging" },
        items: [
            {
                key: "logging.level",
                label: { zh: "级别", en: "Level" },
                desc: { zh: "error=仅错误, info=正常, debug=详细调试", en: "Verbosity level" },
                type: "enum",
                options: ["error", "warn", "info", "debug"]
            },
            {
                key: "logging.redactSecrets",
                label: { zh: "隐藏敏感", en: "Redact" },
                desc: { zh: "日志中自动隐藏密钥等敏感信息", en: "Hide secrets in logs" },
                type: "boolean"
            }
        ]
    }
];
