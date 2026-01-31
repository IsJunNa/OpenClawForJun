# OpenClaw 配置管理工具

> **OpenClaw 一键部署 + 全中文配置管理**

[![Version](https://img.shields.io/badge/Version-3.0.1-blue.svg)](https://github.com/IsJunNa/OpenClawForJun)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

专为 [OpenClaw](https://openclaw.ai) 设计的中文配置管理工具，通过直观的交互式菜单管理 AI 助手的所有配置。

---

## 功能特性

| 特性 | 说明 |
|------|------|
| **中英文切换** | 一键切换界面语言 |
| **配置说明** | 每个选项都有用途说明 |
| **多通道支持** | WhatsApp / Telegram / Discord / Slack / Signal 等 |
| **安全控制** | 沙箱模式、命令执行权限控制 |
| **自动更新** | 启动时检查新版本 |

---

## 快速安装

### macOS / Linux

```bash
curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash
```

### Windows (PowerShell 管理员)

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))
```

---

## 使用方法

```bash
openclaw-jun
```

### 配置分类

| 分类 | 说明 |
|------|------|
| 基础核心 | AI 模型、时区、工作目录 |
| 通信频道 | WhatsApp/Telegram/Discord 等连接配置 |
| 会话管理 | 会话隔离、自动重置策略 |
| 浏览器控制 | AI 浏览器自动化 |
| 定时任务 | Cron 定时执行 |
| 网关服务 | 端口、认证、日志 |
| 安全控制 | 沙箱、命令执行权限 |

---

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| `command not found: node` | 安装 Node.js v22+ 并添加到 PATH |
| `Permission denied` | macOS/Linux 加 `sudo`，Windows 用管理员 |
| 网关启动失败 | 运行 `openclaw doctor` 诊断 |
| 配置不生效 | 运行 `openclaw gateway restart` |

---

## 相关链接

- [OpenClaw 官方](https://openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [本项目 Issues](https://github.com/IsJunNa/OpenClawForJun/issues)

---

## 许可

MIT License | Developed by Jun
