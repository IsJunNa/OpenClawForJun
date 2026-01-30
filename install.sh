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
echo -e "${GREEN}   🦆 OpenClawForJun 全自动部署脚本 (v1.5.0)      ${NC}"
echo -e "${GREEN}   作者: Jun | 环境兼容性增强版 | 严禁倒卖        ${NC}"
echo -e "${GREEN}==================================================${NC}"

# 权限检测
if [ "$EUID" -ne 0 ]; then
  echo -e "${YELLOW}提示: 部分环境安装可能需要输入密码以获取管理员权限...${NC}"
fi

# 1. 环境依赖全自动安装
echo -e "\n${YELLOW}[1/4] 🔍 正在检查并配置运行环境...${NC}"

# 检测 OS 类型
OS_TYPE="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS_TYPE="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS_TYPE="macos"
fi

install_node() {
    echo -e "${YELLOW}未检测到 Node.js，准备开始全自动安装...${NC}"
    if [ "$OS_TYPE" == "macos" ]; then
        if ! command -v brew &> /dev/null; then
            echo -e "正在安装 Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        brew install node
    elif [ "$OS_TYPE" == "linux" ]; then
        if command -v apt-get &> /dev/null; then
            echo -e "检测到 Debian/Ubuntu 环境，正在通过 NodeSource 安装..."
            curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            echo -e "检测到 RHEL/CentOS 环境，正在安装..."
            curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
            sudo yum install -y nodejs
        else
            echo -e "${RED}无法自动识别包管理器，请手动安装 Node.js v22+${NC}"
            exit 1
        fi
    fi
}

if ! command -v node &> /dev/null; then
    install_node
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: Node.js 已安装但 npm 缺失，请检查环境。${NC}"
    exit 1
fi

echo -e "   - Node.js 版本: $(node -v) ${GREEN}[OK]${NC}"
echo -e "   - npm 版本: $(npm -v) ${GREEN}[OK]${NC}"

# 2. 安装 OpenClaw 核心
echo -e "\n${YELLOW}[2/4] 🚀 正在检查并配置 OpenClaw 核心程序...${NC}"
if ! command -v openclaw &> /dev/null; then
    echo -e "   - 未检测到 OpenClaw，正在安装..."
    sudo npm install -g openclaw || npm install -g openclaw
else
    echo -e "   - 检测到 OpenClaw 已安装: $(openclaw --version) ${GREEN}[跳过]${NC}"
fi

# 3. 安装中文管理工具
echo -e "\n${YELLOW}[3/4] 🛠️ 正在同步管理中心 (OpenClawForJun)...${NC}"
INSTALL_DIR="$HOME/OpenClawForJun"
if [ -d "$INSTALL_DIR" ]; then
    echo -e "   - 检测到旧版本，正在强制同步最新代码..."
    cd "$INSTALL_DIR" && git fetch --all && git reset --hard origin/main
else
    echo -e "   - 正在拉取全新代码库..."
    git clone https://github.com/IsJunNa/OpenClawForJun.git "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi

echo -e "   - 正在修复执行权限并更新全局指令..."
chmod +x src/index.js
sudo npm install -g . || npm install -g .

# 4. 完成
echo -e "\n${GREEN}==================================================${NC}"
echo -e "${GREEN}   🎉 恭喜！系统已达到「拎包入住」状态！${NC}"
echo -e "   核心驱动: ${BLUE}https://github.com/openclaw/openclaw${NC}"
echo -e "\n   ${YELLOW}现在请输入: ${CYAN}openclaw-jun${NC}${YELLOW} 立即开启管理！${NC}"
echo -e "${GREEN}==================================================${NC}"
