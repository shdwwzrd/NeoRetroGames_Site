@echo off
rem Serves the site locally at http://localhost:8000/ (Ctrl+C to stop)
cd /d "%~dp0.."
start "" http://localhost:8000/
py -3 -m http.server 8000 2>nul && goto :eof
python -m http.server 8000 2>nul && goto :eof
python -m SimpleHTTPServer 8000
