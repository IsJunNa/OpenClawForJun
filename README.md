# 🤖 OpenClawForJun

> **一键极速部署 OpenClaw & 全中文配置管理套件**

[![Version](https://img.shields.io/badge/Version-1.1.0-blue.svg)](https://github.com/IsJunNa/OpenClawForJun)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/Core-OpenClaw-orange.svg)](https://github.com/openclaw/openclaw)

`OpenClawForJun` 是专为中文用户设计的 **OpenClaw (原 Clawd)** 增强工具包。它通过全自动化的安装流程和直观的中文 CLI 交互界面，解决了原生工具配置复杂、语言障碍等痛点。

---

## 📸 界面预览

![CLI Menu](https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/assets/preview.png)
*(注：上图为 CLI 运行示意图，涵盖分层菜单、多选修改等功能)*

---

## ✨ 核心亮点

### 1. 🚀 自动化环境搭建
- **一行命令**：自动安装 Node.js 依赖、OpenClaw 核心及管理工具。
- **环境自检**：安装前自动校验系统版本、Node.js 环境，确保一次成功。

### 2. 🏮 母语级配置体验
- **全量汉化**：将数百项 JSON 配置转化为大白话，每一项都配有中文说明。
- **分层管理**：采用分级目录（核心设置、频道管理、安全策略等），逻辑条理清晰。

### 3. ⌨️ 高效交互逻辑
- **数字选单**：摒弃繁琐的文本输入，支持通过 `1 / 2` 快速切换布尔值（开启/关闭）或选择枚举项。
- **快速初始化**：内置向导，三分钟完成从零到上线的所有核心步骤。

### 4. 🛠️ 运维一键化
- **热重启集成**：配置修改后可在工具内直接重启 OpenClaw 网关，无需手动执行复杂指令。

---

## 🚀 快速开始

### 方式一：一键安装（推荐）

在终端中运行以下命令：

```bash
curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash
```

### 方式二：手动部署

```bash
git clone https://github.com/IsJunNa/OpenClawForJun.git
cd OpenClawForJun
npm install -g .
```

安装完成后，在终端输入 `openclaw-jun` 即可启动管理中心。

---

## 🛠️ 配置覆盖范围

本工具支持管理 OpenClaw 的绝大部分核心配置，包括但不限于：
- **核心模型**：Google Gemini, OpenAI, Claude, Ollama 等模型路径设置。
- **消息频道**：Telegram (Bot Token, DM Policy), Discord, WhatsApp, Slack 等。
- **搜索工具**：Brave Search, Perplexity API 密钥与服务商切换。
- **安全权限**：终端命令执行控制、配置热修改权限、执行安全等级。
- **系统设置**：网关端口绑定、时区设定、日志详细等级。

---

## ⚖️ 权利与声明

1. **开源致敬**：核心功能由 [OpenClaw](https://github.com/openclaw/openclaw) 提供驱动，本项目仅作为管理增强插件。
2. **纯净无毒**：本项目**完全免费**，且不会收集、上传任何用户的 API Key 或配置信息。
3. **作者说明**：本项目脚本由 **Jun** 维护，遵循 MIT 开源协议。

---

## ⭐ 支持作者

如果您觉得本项目对您有所帮助，请为本项目点一个 **Star**。

---
*Powered by OpenClaw | Enhanced by Jun*
