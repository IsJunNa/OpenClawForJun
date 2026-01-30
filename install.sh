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
    │               作者: Jun | v1.9.0                 │
    └──────────────────────────────────────────────────┘
${NC}"

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}   🦆 OpenClawForJun 全自动部署脚本 (v1.9.0)      ${NC}"
echo -e "${GREEN}   作者: Jun | 极简专业版 | 免费开源              ${NC}"
echo -e "${GREEN}==================================================${NC}"

# 1. 环境依赖安装
# (Node 安装逻辑保持不变...)

# 2. 同步与安装逻辑
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    cd "$INSTALL_DIR" && git fetch --all && git reset --hard origin/main
else
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

chmod +x src/index.js
sudo npm install -g . || npm install -g .

echo -e "\n${GREEN}🎉 部署完成！请输入 openclaw-jun 开始体验。${NC}"
