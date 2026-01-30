/**
 * OpenClawForJun 全量配置映射定义
 * 作者: Jun
 * 旨在覆盖所有核心与高级配置
 */

module.exports = [
    {
        id: "core",
        label: "核心脑子 (AI模型与思考)",
        items: [
            { key: "agents.defaults.model.primary", label: "主模型", desc: "如: google-gemini-cli/gemini-3-flash-preview" },
            { key: "agents.defaults.thinkingDefault", label: "思考深度", desc: "off/low/medium/high/xhigh" },
            { key: "agents.defaults.verboseDefault", label: "详细过程", desc: "是否展示工具调用 (on/off)" },
            { key: "agents.defaults.userTimezone", label: "时区", desc: "如 Asia/Shanghai" }
        ]
    },
    {
        id: "telegram",
        label: "Telegram 频道",
        items: [
            { key: "channels.telegram.enabled", label: "启用", desc: "true/false" },
            { key: "channels.telegram.botToken", label: "机器人 Token", desc: "来自 @BotFather" },
            { key: "channels.telegram.dmPolicy", label: "私聊策略", desc: "pairing/allowlist/open" },
            { key: "channels.telegram.streamMode", label: "流式模式", desc: "off/partial/block" }
        ]
    },
    {
        id: "discord",
        label: "Discord 频道",
        items: [
            { key: "channels.discord.enabled", label: "启用", desc: "true/false" },
            { key: "channels.discord.token", label: "机器人 Token", desc: "来自 Discord Dev Portal" },
            { key: "channels.discord.dmPolicy", label: "私聊策略", desc: "pairing/allowlist/open" }
        ]
    },
    {
        id: "whatsapp",
        label: "WhatsApp 频道",
        items: [
            { key: "channels.whatsapp.enabled", label: "启用", desc: "true/false" },
            { key: "channels.whatsapp.dmPolicy", label: "私聊策略", desc: "pairing/allowlist/open" }
        ]
    },
    {
        id: "search",
        label: "联网搜索工具",
        items: [
            { key: "tools.web.search.enabled", label: "启用搜索", desc: "true/false" },
            { key: "tools.web.search.provider", label: "提供商", desc: "brave / perplexity" },
            { key: "tools.web.search.apiKey", label: "API Key", desc: "搜索服务的密钥" }
        ]
    },
    {
        id: "security",
        label: "权限与安全",
        items: [
            { key: "commands.bash", label: "运行 Shell (!)", desc: "开启后 AI 拥有终端权限 (高风险)" },
            { key: "commands.config", label: "修改配置 (/config)", desc: "允许聊天中改配置" },
            { key: "tools.exec.security", label: "执行安全级", desc: "deny/allowlist/full" }
        ]
    },
    {
        id: "system",
        label: "系统底层",
        items: [
            { key: "gateway.port", label: "端口", desc: "默认 18789" },
            { key: "gateway.bind", label: "绑定", desc: "loopback/lan/auto" },
            { key: "logging.level", label: "日志量", desc: "error/info/debug/trace" }
        ]
    }
];
