# OpenClawForJun Windows Full-Auto Deployment Script
# Author: Jun

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   🦆 OpenClawForJun Windows 全自动部署脚本       " -ForegroundColor Green
Write-Host "   作者: Jun | 环境兼容性增强版 | 免费开源        " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 1. 检查并安装 Node.js
Write-Host "`n[1/4] 🔍 检查运行环境..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "未检测到 Node.js，准备开始全自动安装..." -ForegroundColor Cyan
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "通过 winget 安装 Node.js LTS..."
        winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
    } else {
        Write-Host "正在从官方下载 Node.js 安装包..." -ForegroundColor Cyan
        $url = "https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi"
        $out = "$env:TEMP\node_install.msi"
        Invoke-WebRequest -Uri $url -OutFile $out
        Write-Host "正在静默安装，请稍候..."
        Start-Process msiexec.exe -ArgumentList "/i $out /qn /norestart" -Wait
    }
    
    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    if (!(Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ 自动安装失败，请手动从 https://nodejs.org/ 安装 Node.js v22+" -ForegroundColor Red
        exit 1
    }
}
Write-Host "   - Node.js 版本: $(node -v) [OK]" -ForegroundColor Green

# 2. 安装 OpenClaw 核心
Write-Host "`n[2/4] 🚀 正在安装 OpenClaw 核心..." -ForegroundColor Yellow
npm install -g openclaw

# 3. 配置管理工具
Write-Host "`n[3/4] 🛠️ 正在部署 OpenClawForJun..." -ForegroundColor Yellow
$InstallDir = Join-Path $HOME "OpenClawForJun"

if (Test-Path $InstallDir) {
    Set-Location $InstallDir
    git pull
} else {
    git clone https://github.com/IsJunNa/OpenClawForJun.git $InstallDir
    Set-Location $InstallDir
}

npm install -g .

# 4. 完成
Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "   🎉 部署圆满成功！" -ForegroundColor Green
Write-Host "`n   请在任意终端输入: openclaw-jun 开启智能中心！" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green
