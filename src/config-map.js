/**
 * OpenClawForJun 核心配置映射定义
 * 包含中英文双语支持
 * 已根据用户反馈进行深度优化：包含备份模型、时区选单、分层频道、安全说明
 */

module.exports = [
    {
        id: "core",
        label: { zh: "基础核心设置", en: "Core Settings" },
        items: [
            { 
                key: "agents.defaults.model.primary", 
                label: { zh: "主 AI 模型", en: "Primary AI Model" }, 
                desc: { zh: "AI 响应的核心脑干模型", en: "The main AI brain for responses" }, 
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
                key: "agents.defaults.model.fallbacks", 
                label: { zh: "备份 AI 模型", en: "Fallback AI Model" }, 
                desc: { zh: "当主模型不可用或配额耗尽时自动切换的备用模型", en: "Auto-switch to this when the primary model fails" }, 
                type: "enum",
                options: [
                    "google-gemini-cli/gemini-3-flash-preview",
                    "google-gemini-cli/gemini-3-pro-preview",
                    "openai/gpt-4o",
                    "openai/gpt-4o-mini",
                    "anthropic/claude-3-5-sonnet-latest",
                    "自定义/Manual Input"
                ],
                isArray: true // 处理数组格式
            },
            { 
                key: "agents.defaults.thinkingDefault", 
                label: { zh: "思考深度", en: "Thinking Depth" }, 
                desc: { zh: "决定 AI 在回复前进行推理的程度 (off 为直接回复，xhigh 为深度思考)", en: "Level of reasoning before response" }, 
                type: "enum", 
                options: ["off", "low", "medium", "high", "xhigh"] 
            },
            { 
                key: "agents.defaults.verboseDefault", 
                label: { zh: "详细模式", en: "Verbose Mode" }, 
                desc: { zh: "开启后会在界面展示 AI 调用搜索、运行代码等工具的详细心路历程", en: "Shows tool invocation details in the chat" }, 
                type: "enum", 
                options: ["on", "off", "full"] 
            },
            { 
                key: "agents.defaults.userTimezone", 
                label: { zh: "用户时区", en: "User Timezone" }, 
                desc: { zh: "决定时间相关的提醒和日志记录时间", en: "Determines time for reminders and logs" }, 
                type: "enum",
                options: [
                    "Asia/Shanghai", "Asia/Hong_Kong", "Asia/Taipei", "Asia/Tokyo", "Asia/Singapore",
                    "America/New_York", "America/Los_Angeles", "America/Chicago", 
                    "Europe/London", "Europe/Paris", "Europe/Berlin", 
                    "Australia/Sydney", "UTC", "自定义输入"
                ]
            }
        ]
    },
    {
        id: "channels",
        label: { zh: "通信频道管理", en: "Messaging Channels" },
        isCategory: true,
        subCategories: [
            {
                id: "tg",
                label: { zh: "Telegram 机器人", en: "Telegram Bot" },
                items: [
                    { key: "plugins.entries.telegram.enabled", label: { zh: "启用插件", en: "Enable Plugin" }, desc: { zh: "是否加载 Telegram 支持模块", en: "Load Telegram plugin" }, type: "boolean" },
                    { key: "channels.telegram.enabled", label: { zh: "启用频道", en: "Enable Channel" }, desc: { zh: "是否开启此机器人通信", en: "Enable communication" }, type: "boolean" },
                    { key: "channels.telegram.botToken", label: { zh: "机器人令牌", en: "Bot Token" }, desc: { zh: "从 @BotFather 获取的令牌字符串", en: "Token from @BotFather" }, type: "string" },
                    { key: "channels.telegram.dmPolicy", label: { zh: "私聊策略", en: "DM Policy" }, desc: { zh: "控制谁能私聊机器人 (pairing 为扫码配对)", en: "Who can talk to the bot" }, type: "enum", options: ["pairing", "allowlist", "open", "disabled"] }
                ]
            },
            {
                id: "discord",
                label: { zh: "Discord 机器人", en: "Discord Bot" },
                items: [
                    { key: "plugins.entries.discord.enabled", label: { zh: "启用插件", en: "Enable Plugin" }, desc: { zh: "是否加载 Discord 支持模块", en: "Load Discord plugin" }, type: "boolean" },
                    { key: "channels.discord.enabled", label: { zh: "启用频道", en: "Enable Channel" }, desc: { zh: "是否开启此频道通信", en: "Enable communication" }, type: "boolean" },
                    { key: "channels.discord.token", label: { zh: "机器人令牌", en: "Bot Token" }, desc: { zh: "来自 Discord Developer Portal", en: "Token from Discord Dev Portal" }, type: "string" }
                ]
            },
            {
                id: "whatsapp",
                label: { zh: "WhatsApp", en: "WhatsApp" },
                items: [
                    { key: "plugins.entries.whatsapp.enabled", label: { zh: "启用插件", en: "Enable Plugin" }, desc: { zh: "是否加载 WhatsApp 模块", en: "Load WhatsApp plugin" }, type: "boolean" },
                    { key: "channels.whatsapp.enabled", label: { zh: "启用频道", en: "Enable Channel" }, desc: { zh: "是否开启此频道通信", en: "Enable communication" }, type: "boolean" }
                ]
            }
        ]
    },
    {
        id: "security",
        label: { zh: "安全与执行策略", en: "Security & Permissions" },
        items: [
            { 
                key: "commands.bash", 
                label: { zh: "终端执行 (!)", en: "Bash Command (!)" }, 
                desc: { zh: "允许 AI 通过 ! 指令直接执行系统命令 [高风险：AI 可能会误删文件或修改系统设置]", en: "Allows AI to execute shell commands" }, 
                type: "boolean" 
            },
            { 
                key: "commands.config", 
                label: { zh: "动态配置 (/config)", en: "Dynamic Config (/config)" }, 
                desc: { zh: "允许 AI 在对话中直接修改配置文件 [风险：AI 可能会修改关键权限]", en: "Allows AI to edit config.json via chat" }, 
                type: "boolean" 
            },
            { 
                key: "tools.exec.security", 
                label: { zh: "代码执行安全级", en: "Code Security Level" }, 
                desc: { zh: "控制 AI 运行代码的限制强度 (deny: 禁止，allowlist: 仅限白名单，full: 完全信任)", en: "Security level for code execution" }, 
                type: "enum", 
                options: ["deny", "allowlist", "full"] 
            },
            { 
                key: "tools.exec.ask", 
                label: { zh: "执行确认策略", en: "Execution Prompt" }, 
                desc: { zh: "决定 AI 运行命令前是否需要您手动确认 (always: 每次必问，on-miss: 没把握才问)", en: "Whether to ask before running commands" }, 
                type: "enum", 
                options: ["always", "on-miss", "off"] 
            }
        ]
    }
];
