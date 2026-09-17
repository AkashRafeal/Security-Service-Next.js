@echo off
echo ===================================================
echo   Vanguard Defense ^& Security Services Platform
echo ===================================================
echo.
echo Starting Backend (Spring Boot on port 8095)...
start "Backend (Spring Boot)" cmd /k "cd /d "%~dp0security-services\security-services-backend" && mvn spring-boot:run"

echo Starting Frontend (Vite on port 5173)...
start "Frontend (React Vite)" cmd /k "cd /d "%~dp0security-services\security-services-frontend" && npm run dev"

echo.
echo [SUCCESS] Both Backend and Frontend launched in dedicated windows.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8095
echo ===================================================
