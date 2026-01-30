# 🤖 OpenClaw Manager (By Jun)

> **One-Click Deployment & Multilingual Configuration Interface for OpenClaw**

[![Version](https://img.shields.io/badge/Version-1.3.0-blue.svg)](https://github.com/IsJunNa/OpenClawForJun)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

`OpenClawForJun` is a professional management suite for **OpenClaw (Clawd)**. It provides a simplified configuration interface, allowing users to manage their AI assistant via an intuitive CLI menu with full Chinese and English support.

---

## 📺 Preview

![Main Menu](https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/assets/preview_main.png)

---

## ✨ Key Features

- 🚀 **Automated Setup**: Install Node.js dependencies and OpenClaw core with a single command.
- 🌍 **Multilingual UI**: Toggle between **Chinese** and **English** directly from the main menu.
- ⌨️ **Smart Interaction**: Use numeric keys (`1, 2, 3...`) to toggle booleans, select from lists, or switch categories.
- 📂 **Categorized Management**: Logical grouping of settings (Core, Channels, Security, System).
- 🛠️ **Built-in Wizard**: Step-by-step guidance for first-time configuration.
- 🔄 **One-Click Restart**: Apply changes instantly by restarting the gateway from the CLI.

---

## 🚀 Quick Start

### macOS / Linux

Run the following command:
```bash
curl -sSL https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.sh | bash
```

### Windows (PowerShell)

Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/IsJunNa/OpenClawForJun/main/install.ps1'))
```

---

## 🛠️ Usage

After installation, simply type `openclaw-jun` in your terminal to start the manager.

---

## 🔍 Troubleshooting (常见错误排查)

| Error (错误信息) | Solution (对策) |
| :--- | :--- |
| `command not found: node` | Ensure Node.js v22+ is installed and in your PATH. |
| `Permission denied` | Run the installation with `sudo` (Linux/macOS) or as Admin (Windows). |
| `Restart Failed` | Ensure OpenClaw Gateway is actually running (`openclaw gateway start`). |
| `Invalid Token` | Double-check your API/Bot Token for typos or extra spaces. |

---

## ⚖️ Disclaimer

1. **Credits**: Core functionality is powered by [OpenClaw](https://github.com/openclaw/openclaw). This tool is an independent management enhancer.
2. **Privacy**: This tool is **completely free** and does not collect or upload any user data or API keys.
3. **License**: Maintained by **Jun**, distributed under the MIT License.

---

## ⭐ Support the Project

If you find this tool helpful, please give it a **Star** on GitHub!

---
*Developed by Jun | Enhanced experience for the OpenClaw community*
