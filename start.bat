@echo off
REM Vaulto Financial Model - Quick Start Script for Windows

echo Starting Vaulto Financial Model Dashboard...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python 3 is not installed. Please install Python 3.9+ first.
    pause
    exit /b 1
)

REM Check if Node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Start Backend
echo Setting up backend...
cd backend

REM Create venv if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv
call venv\Scripts\activate.bat

REM Install dependencies
if not exist "venv\.installed" (
    echo Installing backend dependencies...
    pip install -r requirements.txt
    type nul > venv\.installed
)

REM Start backend in new window
echo Starting backend server...
start "Vaulto Backend" cmd /k "venv\Scripts\activate.bat && python main.py"

cd ..

REM Start Frontend
echo.
echo Setting up frontend...
cd frontend

REM Install dependencies
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo Starting frontend server...
start "Vaulto Frontend" cmd /k "npm start"

cd ..

echo.
echo Vaulto Financial Model Dashboard is starting!
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Close the command windows to stop the servers.
echo.
pause



