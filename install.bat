@echo off
title ArtGenesis Setup ^& Start
echo ==================================================
echo    🚀 Welcome to ArtGenesis Setup ^& Start Script!
echo ==================================================
echo.

echo 📦 Installing dependencies...
call npm install

echo.
echo ⚙️  Checking environment variables...

if not exist "apps\api\.env" (
    if exist "apps\api\.env.example" (
        echo Creating .env for API...
        copy "apps\api\.env.example" "apps\api\.env" > nul
    )
)

if not exist "apps\web\.env" (
    if exist "apps\web\.env.example" (
        echo Creating .env for Web...
        copy "apps\web\.env.example" "apps\web\.env" > nul
    )
)

echo.
echo ✨ Setup complete! Starting the application stack (Next.js + NestJS)...
echo You can access the frontend at http://localhost:3000
echo.

call npm run dev
pause
