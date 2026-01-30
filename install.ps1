# OpenClawForJun Windows Deployment Script
# Author: Jun

Write-Host "
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
" -ForegroundColor Cyan

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   🦆 OpenClawForJun Windows 全自动部署脚本       " -ForegroundColor Green
Write-Host "   作者: Jun | 高亮交互稳定版 | 免费开源          " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 1. Node.js check (省略具体逻辑，同前)

# 2. Sync and Install
$InstallDir = Join-Path $HOME "OpenClawForJun"
if (Test-Path $InstallDir) {
    Set-Location $InstallDir
    git fetch --all
    git reset --hard origin/main
} else {
    git clone https://github.com/IsJunNa/OpenClawForJun.git $InstallDir
    Set-Location $InstallDir
}

Write-Host "   - Installing interactive components..." -ForegroundColor Yellow
npm install --production

Write-Host "   - Registering global command..." -ForegroundColor Yellow
npm install -g .

Write-Host "`n🎉 Deployment Successful! Run 'openclaw-jun' to start." -ForegroundColor Green
