@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required to run this website.
  echo Install Node.js, then double-click this file again.
  pause
  exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$url='http://127.0.0.1:3000/'; $ready=$false; try { $response=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1; $ready=($response.StatusCode -eq 200) } catch { }; if (-not $ready) { Start-Process -FilePath $env:ComSpec -ArgumentList '/k', ('cd /d ""' + (Get-Location).Path + '"" && node server.js') -WorkingDirectory (Get-Location).Path; for ($i=0; $i -lt 30; $i++) { try { $response=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1; if ($response.StatusCode -eq 200) { $ready=$true; break } } catch { }; Start-Sleep -Milliseconds 500 } }; if ($ready) { Start-Process $url; exit 0 } else { Write-Host 'The website did not start. Check the server window for errors.'; Read-Host 'Press Enter to close'; exit 1 }"

if errorlevel 1 pause
