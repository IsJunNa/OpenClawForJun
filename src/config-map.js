/**
 * OpenClawForJun 核心配置映射定义
 * 作者: Jun
 * 覆盖 OpenClaw 大部分常用配置项
 */

module.exports = [
    {
        id: "core",
        label: "核心设置",
        items: [
            { key: "agents.defaults.model.primary", label: "主 AI 模型", desc: "AI 回复的核心脑子 (如: google-gemini-cli/gemini-3-flash-preview)" },
            { key: "agents.defaults.thinkingDefault", label: "思考深度", desc: "off(不思考)/low/medium/high/xhigh" },
            { key: "agents.defaults.verboseDefault", label: "详细模式", desc: "是否在界面显示工具调用详情 (on/off)" },
            { key: "agents.defaults.userTimezone", label: "用户时区", desc: "建议设置为 Asia/Shanghai" },
            { key: "agents.defaults.timeFormat", label: "时间格式", desc: "12 或 24 小时制" }
        ]
    },
    {
        id: "telegram",
        label: "Telegram 频道设置",
        items: [
            { key: "channels.telegram.enabled", label: "启用 Telegram", desc: "是否开启 (true/false)" },
            { key: "channels.telegram.botToken", label: "机器人 Token", desc: "从 @BotFather 获取" },
            { key: "channels.telegram.dmPolicy", label: "私聊策略", desc: "pairing(配对)/allowlist(白名单)/open(开放)" },
            { key: "channels.telegram.streamMode", label: "流式输出", desc: "off/partial/block (推荐 block)" }
        ]
    },
    {
        id: "tools",
        label: "网页搜索与抓取",
        items: [
            { key: "tools.web.search.enabled", label: "开启网页搜索", desc: "是否允许 AI 联网搜索 (true/false)" },
            { key: "tools.web.search.provider", label: "搜索服务商", desc: "brave 或 perplexity" },
            { key: "tools.web.search.apiKey", label: "搜索 API Key", desc: "对应服务商的密钥" },
            { key: "tools.web.fetch.enabled", label: "开启网页抓取", desc: "允许 AI 读取网页链接内容 (true/false)" }
        ]
    },
    {
        id: "security",
        label: "安全与高级权限",
        items: [
            { key: "commands.bash", label: "允许终端指令 (!)", desc: "是否允许 AI 运行 Shell 命令 (高风险)" },
            { key: "commands.config", label: "允许配置修改 (/config)", desc: "是否允许 AI 直接修改 openclaw.json" },
            { key: "commands.restart", label: "允许远程重启", desc: "是否允许通过指令重启网关" },
            { key: "tools.exec.security", label: "执行安全级别", desc: "deny/allowlist/full (默认 allowlist)" }
        ]
    },
    {
        id: "system",
        label: "系统底层配置",
        items: [
            { key: "gateway.port", label: "网关端口", desc: "默认 18789" },
            { key: "gateway.bind", label: "绑定地址", desc: "loopback(仅本机)/lan(局域网)/auto" },
            { key: "logging.level", label: "日志级别", desc: "error/warn/info/debug/trace" }
        ]
    }
];
