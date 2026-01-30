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
    │        ,,            ,,     ,,     ,,            │
    │       (  ' )>       (  )>  (  )>  (  )>          │
    │      < (  /   ~~~~  ( /    ( /    ( /            │
    │       \`---'         \`-'    \`-'    \`-'            │
    │  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~      │
    │                                                  │
    │            OpenClaw Management Center            │
    │                   Author: Jun                    │
    └──────────────────────────────────────────────────┘
${NC}"

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}   🦆 OpenClawForJun 全自动部署脚本 (v1.7.0)      ${NC}"
echo -e "${GREEN}   作者: Jun | 鸭鸭家族版 | 免费开源              ${NC}"
echo -e "${GREEN}==================================================${NC}"

# 1. 环境检查
if ! command -v node &> /dev/null; then
    echo -e "\n${YELLOW}正在准备 Node.js 环境...${NC}"
    # (Node 安装逻辑保持不变...)
fi

# 2. 安装/同步逻辑 (使用 git reset --hard 确保最新)
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    cd "$INSTALL_DIR" && git fetch --all && git reset --hard origin/main
else
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

chmod +x src/index.js
sudo npm install -g . || npm install -g .

echo -e "\n${GREEN}🎉 部署成功！请输入 openclaw-jun 开启管理。${NC}"
