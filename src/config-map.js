/**
 * OpenClawForJun 配置映射定义
 * 作者: Jun
 */

module.exports = [
    {
        id: "core",
        label: "核心设置",
        items: [
            { key: "agents.defaults.model.primary", label: "主 AI 模型", desc: "AI 回复的核心脑子 (如: google-gemini-cli/gemini-3-flash-preview)" },
            { key: "agents.defaults.thinkingDefault", label: "思考深度", desc: "off(不思考)/low/medium/high/xhigh" },
            { key: "agents.defaults.verboseDefault", label: "详细模式", desc: "是否在界面显示工具调用详情 (on/off)" }
        ]
    },
    {
        id: "channels",
        label: "消息频道",
        items: [
            { key: "channels.telegram.enabled", label: "启用 Telegram", desc: "是否通过 Telegram 机器人交流 (true/false)" },
            { key: "channels.telegram.botToken", label: "Telegram 令牌", desc: "从 @BotFather 获取的 Token" },
            { key: "channels.telegram.dmPolicy", label: "私聊策略", desc: "pairing(配对使用)/allowlist(白名单)/open(开放)" },
            { key: "channels.whatsapp.enabled", label: "启用 WhatsApp", desc: "是否启用 WhatsApp 接入 (true/false)" }
        ]
    },
    {
        id: "system",
        label: "系统配置",
        items: [
            { key: "agents.defaults.userTimezone", label: "您的时区", desc: "建议设置为 Asia/Shanghai" },
            { key: "gateway.port", label: "网关端口", desc: "网关运行的端口 (默认 18789)" },
            { key: "logging.level", label: "日志级别", desc: "控制日志输出量 (info/debug/trace)" }
        ]
    },
    {
        id: "security",
        label: "安全与权限",
        items: [
            { key: "commands.bash", label: "运行命令 (!指令)", desc: "是否允许在对话中执行 Shell 命令 (高风险 true/false)" },
            { key: "commands.config", label: "修改配置 (/config)", desc: "是否允许在对话中直接修改配置 (true/false)" },
            { key: "commands.restart", label: "重启网关 (/restart)", desc: "是否允许在对话中重启服务 (true/false)" }
        ]
    }
];
