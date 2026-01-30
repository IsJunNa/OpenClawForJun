#!/bin/bash

# --- 样式定义 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

VERSION="3.0.9"

echo -e "${CYAN}
──────────────────────────────────────────────────
  OpenClaw 配置管理工具
  版本: v${VERSION} | 作者: Jun
──────────────────────────────────────────────────
${NC}"

echo -e "${GREEN}正在部署 OpenClawForJun...${NC}"

# 1. 核心依赖安装 (Node.js)
if ! command -v node &> /dev/null; then
    echo -e "\n${YELLOW}[1/4] 正在安装 Node.js...${NC}"
    if command -v brew &> /dev/null; then
        brew install node
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y nodejs npm
    elif command -v yum &> /dev/null; then
        sudo yum install -y nodejs npm
    else
        echo -e "${RED}请手动安装 Node.js v22+${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Node.js 已安装${NC}"
fi

# 2. OpenClaw 核心安装
if ! command -v openclaw &> /dev/null; then
    echo -e "\n${YELLOW}[2/4] 正在安装 OpenClaw 核心...${NC}"
    sudo npm install -g openclaw || npm install -g openclaw
else
    echo -e "${GREEN}✓ OpenClaw 已安装${NC}"
fi

# 3. 同步管理工具并安装依赖
echo -e "\n${YELLOW}[3/4] 正在同步代码...${NC}"
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    cd "$INSTALL_DIR" && git fetch --all && git reset --hard origin/main
else
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

# 安装依赖
echo -e "${YELLOW}   安装依赖...${NC}"
npm install --production

# 链接全局命令
echo -e "\n${YELLOW}[4/4] 配置全局命令...${NC}"
chmod +x src/index.js
sudo npm install -g . || npm install -g .

# 4. 完成
echo -e "\n${GREEN}──────────────────────────────────────────────────${NC}"
echo -e "${GREEN}✓ 部署成功！${NC}"
echo -e "  运行 ${YELLOW}openclaw-jun${NC} 开始使用"
echo -e "${GREEN}──────────────────────────────────────────────────${NC}"
