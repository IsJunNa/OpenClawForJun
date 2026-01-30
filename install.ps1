# OpenClawForJun Windows Installation Script
# Author: Jun

$ErrorActionPreference = "Stop"

Write-Host "==================================================" -ForegroundColor Green
Write-Host "   🦆 OpenClawForJun Windows Deployment Script    " -ForegroundColor Green
Write-Host "   Author: Jun | License: MIT | Fully Free        " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# 1. Check Node.js
Write-Host "`n[1/4] 🔍 Checking environment..." -ForegroundColor Yellow
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Node.js not found. Please install Node.js v22+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "   - Node.js Version: $(node -v) [OK]" -ForegroundColor Green

# 2. Install OpenClaw
Write-Host "`n[2/4] 🚀 Installing OpenClaw core..." -ForegroundColor Yellow
npm install -g openclaw

# 3. Setup Management Tool
Write-Host "`n[3/4] 🛠️ Configuring OpenClawForJun..." -ForegroundColor Yellow
$InstallDir = Join-Path $HOME "OpenClawForJun"

if (Test-Path $InstallDir) {
    Write-Host "   - Existing version found, updating..."
    Set-Location $InstallDir
    git pull
} else {
    Write-Host "   - Cloning repository..."
    git clone https://github.com/IsJunNa/OpenClawForJun.git $InstallDir
    Set-Location $InstallDir
}

npm install -g .

# 4. Finish
Write-Host "`n==================================================" -ForegroundColor Green
Write-Host "   🎉 Deployment Successful!" -ForegroundColor Green
Write-Host "   Core: https://github.com/openclaw/openclaw" -ForegroundColor Blue
Write-Host "`n   Type 'openclaw-jun' to start the manager!" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green
