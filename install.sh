#!/bin/bash

# --- 样式定义 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}   🦆 OpenClawForJun 一键部署脚本         ${NC}"
echo -e "${GREEN}   作者: Jun | 此脚本完全免费             ${NC}"
echo -e "${GREEN}==========================================${NC}"

# 1. 检查 Node.js
echo -e "${YELLOW}[1/4] 正在检查环境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未检测到 Node.js。请先安装 Node.js v22+。${NC}"
    exit 1
fi

# 2. 安装核心
echo -e "${YELLOW}[2/4] 正在安装 OpenClaw 核心程序...${NC}"
npm install -g openclaw

# 3. 安装管理工具
echo -e "${YELLOW}[3/4] 正在配置中文管理工具...${NC}"
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    cd "$INSTALL_DIR" && git pull
else
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi
npm install -g .

# 4. 完成
echo -e "${GREEN}==========================================${NC}"
echo -e "${GREEN}   🎉 安装成功！${NC}"
echo -e "   原项目地址: ${BLUE}https://github.com/openclaw/openclaw${NC}"
echo -e "   请输入 ${YELLOW}openclaw-jun${NC} 进入中文管理中心。"
echo -e "${GREEN}==========================================${NC}"
