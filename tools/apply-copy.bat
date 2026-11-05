@echo off
rem Copies blurb/description text from COPY.md into games.json
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0apply-copy.ps1"
echo.
pause
