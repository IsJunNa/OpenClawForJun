# 🤖 OpenClaw Manager (By Jun)

> **OpenClaw 一键极速部署与多语言配置管理套件**

[![Version](https://img.shields.io/badge/Version-1.9.1-blue.svg)](https://github.com/IsJunNa/OpenClawForJun)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

`OpenClawForJun` 是一款专业的 **OpenClaw (原 Clawd)** 管理增强工具。它提供了一个极致简化的配置界面，让用户能够通过直观的 CLI 数字菜单管理 AI 助手，支持中英文实时切换。

---

## 📺 界面预览 (Preview)

### 主菜单 (Main Menu)
![Main Menu](https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/assets/preview_main.png)

---

## ✨ 核心特性 (Key Features)

- 🌍 **多语言交互**：主菜单一键切换 **中文/英文**，支持状态持久化。
- 📂 **多级配置树**：采用层级化目录管理（核心、频道、安全、系统），支持子分类（如消息频道下细分 Telegram/Discord）。
- ⌨️ **极速数字驱动**：开关、模型、时区、策略等配置全部支持 `1 / 2 / 3` 数字选单，最大限度减少手动打字。
- 🛡️ **安全增强说明**：每一项高级权限均配有详细的中文风险提示与功能说明。
- 🔄 **备份模型支持**：内置备份模型（Fallback Model）配置，确保助手永不离线。
- 🛠️ **全自动环境托管**：自动安装 Node.js、核心程序，并解决 Windows/macOS/Linux 执行权限问题。

---

## 🚀 快速开始 (Quick Start)

### macOS / Linux

在终端运行以下命令：
```bash
curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash
```

### Windows (PowerShell)

以管理员身份打开 PowerShell 并运行：
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))
```

---

## 🛠️ 使用说明 (Usage)

安装完成后，在终端输入以下命令即可开启管理中心：
```bash
openclaw-jun
```

---

## 🔍 错误排查 (Troubleshooting)

| 错误信息 (Error) | 解决方案 (Solution) |
| :--- | :--- |
| `command not found: node` | 请确保已安装 Node.js v22+ 并已添加到环境变量。 |
| `Permission denied` | Linux/macOS 请尝试加 `sudo`，Windows 请使用管理员模式。 |
| `Restart Failed` | 请确保 OpenClaw 网关已在后台运行 (`openclaw gateway start`)。 |
| `Invalid Token` | 请检查您的 API 密钥或机器人 Token 是否填写正确。 |

---

## ⚖️ 权利与免责声明 (Disclaimer)

1. **致敬开源**：核心驱动来源于 [OpenClaw](https://github.com/openclaw/openclaw)，本项目仅为其管理增强工具。
2. **隐私安全**：本项目**完全免费**，绝不收集或上传任何用户的敏感配置或 API Key。
3. **软件许可**：脚本由 **Jun** 维护，基于 MIT 协议开源。

---

## ⭐ 支持本项目

如果您觉得这个工具有所帮助，请点击右上角的 **Star** 以示鼓励！

---
*Developed by Jun | 为 OpenClaw 社区提供更佳的交互体验*
