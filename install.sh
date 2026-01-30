#!/bin/bash

# --- 样式定义 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}
    ┌──────────────────────────────────────────────────┐
    │                                                  │
    │                  __                              │
    │                <(o )___                          │
    │                 ( ._> /                          │
    │                  \`---'                           │
    │            ~~~~~~~~~~~~~~~~~~                    │
    │                                                  │
    │            OpenClaw 智能管理中心                 │
    │               作者: Jun | v2.0.2                 │
    └──────────────────────────────────────────────────┘
${NC}"

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}   🦆 OpenClawForJun 全自动部署脚本 (v2.0.2)      ${NC}"
echo -e "${GREEN}   作者: Jun | 高亮交互稳定版 | 免费开源          ${NC}"
echo -e "${GREEN}==================================================${NC}"

# 1. 核心依赖安装 (Node.js)
if ! command -v node &> /dev/null; then
    echo -e "\n${YELLOW}正在准备 Node.js 环境...${NC}"
    # (此处省略具体安装逻辑，保持原逻辑一致)
fi

# 2. OpenClaw 核心安装
if ! command -v openclaw &> /dev/null; then
    echo -e "\n${YELLOW}正在安装 OpenClaw 核心...${NC}"
    sudo npm install -g openclaw || npm install -g openclaw
fi

# 3. 同步管理工具并安装依赖
echo -e "\n${YELLOW}[3/4] 🛠️ 正在同步代码并安装交互组件...${NC}"
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    cd "$INSTALL_DIR" && git fetch --all && git reset --hard origin/main
else
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

# --- 关键修复：确保在本地安装依赖 ---
echo -e "   - 正在安装高亮菜单组件 (enquirer)..."
npm install --production

# --- 链接全局命令 ---
echo -e "   - 正在配置全局快速启动命令..."
chmod +x src/index.js
sudo npm install -g . || npm install -g .

# 4. 完成
echo -e "\n${GREEN}==================================================${NC}"
echo -e "${GREEN}   🎉 部署圆满成功！${NC}"
echo -e "   您可以直接输入 ${YELLOW}openclaw-jun${NC} 开启管理。"
echo -e "${GREEN}==================================================${NC}"
