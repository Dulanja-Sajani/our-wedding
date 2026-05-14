@echo off
REM Wedding Invitation System Setup Script for Windows
REM Installs all dependencies needed for CSV/JSON conversion and sending invitations

echo.
echo 🎉 Wedding Invitation System Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    echo    Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Install npm packages
echo 📦 Installing npm packages...
echo.

call npm install nodemailer twilio dotenv csv-parse

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install packages
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo ===========
echo.
echo 1. Edit guests.csv with your guest list
echo    - Open in Excel, Google Sheets, or any text editor
echo.
echo 2. Convert CSV to JSON:
echo    npm run csv-to-json
echo.
echo 3. Set up credentials in .env file:
echo    - Gmail app password (see INVITATION_SETUP.md)
echo    - Twilio account credentials (see INVITATION_SETUP.md)
echo.
echo 4. Send invitations:
echo    npm run send-invitations
echo.
echo 📖 For detailed instructions, see:
echo    - INVITATION_SETUP.md (email ^& WhatsApp setup)
echo    - CSV_GUIDE.md (CSV/JSON guide)
echo.
pause
