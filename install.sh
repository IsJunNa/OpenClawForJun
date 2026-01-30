#!/bin/bash

# --- 样式定义 ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}   
      _      _      _
   __(.)< __(.)> __(.)= 
   \\___)  \\___)  \\___)   
${NC}"

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}   🦆 OpenClawForJun 一键部署脚本 (v1.0.0)        ${NC}"
echo -e "${GREEN}   作者: Jun | 此脚本完全免费 | 严禁倒卖          ${NC}"
echo -e "${GREEN}==================================================${NC}"

# 权限提升提示
if [ "$EUID" -ne 0 ]; then
  echo -e "${YELLOW}提示: 如果安装过程中遇到权限问题，请尝试使用 sudo 运行此脚本。${NC}"
fi

# 1. 检查 Node.js
echo -e "\n${YELLOW}[1/4] 🔍 正在检查运行环境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: 未检测到 Node.js。请先安装 Node.js v22 或更高版本。${NC}"
    exit 1
fi
echo -e "   - Node.js 版本: $(node -v) ${GREEN}[OK]${NC}"

# 2. 安装 OpenClaw 核心
echo -e "\n${YELLOW}[2/4] 🚀 正在安装 OpenClaw 核心程序...${NC}"
npm install -g openclaw
if [ $? -ne 0 ]; then
    echo -e "${RED}核心安装失败，请检查网络或尝试: sudo npm install -g openclaw${NC}"
    exit 1
fi

# 3. 安装中文管理工具
echo -e "\n${YELLOW}[3/4] 🛠️ 正在配置中文管理中心 (OpenClawForJun)...${NC}"
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    echo -e "   - 检测到旧版本，正在更新..."
    cd "$INSTALL_DIR" && git pull
else
    echo -e "   - 正在拉取代码库..."
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

npm install -g .
if [ $? -ne 0 ]; then
    echo -e "${RED}管理工具链接失败，请尝试: sudo npm install -g .${NC}"
    exit 1
fi

# 4. 完成
echo -e "\n${GREEN}==================================================${NC}"
echo -e "${GREEN}   🎉 部署圆满成功！${NC}"
echo -e "   核心驱动: ${BLUE}https://github.com/openclaw/openclaw${NC}"
echo -e "   管理工具: ${BLUE}https://github.com/IsJunNa/OpenClawForJun${NC}"
echo -e "\n   ${YELLOW}现在请输入: ${CYAN}openclaw-jun${NC}${YELLOW} 开启智能之旅！${NC}"
echo -e "${GREEN}==================================================${NC}"
