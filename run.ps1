Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Vanguard Defense & Security Services Platform" -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Backend (Spring Boot on port 8095)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$baseDir\security-services\security-services-backend'; Write-Host 'Starting Spring Boot Backend...' -ForegroundColor Cyan; mvn spring-boot:run"

Write-Host "Starting Frontend (React Vite on port 5173)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$baseDir\security-services\security-services-frontend'; Write-Host 'Starting React Frontend...' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "[SUCCESS] Both services launched!" -ForegroundColor Green
Write-Host "  - Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "  - Backend:  http://localhost:8095" -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Cyan
