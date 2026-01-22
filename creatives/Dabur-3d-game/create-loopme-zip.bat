@echo off
REM LoopMe Package Creator
echo Creating LoopMe-ready ZIP package...

cd /d "%~dp0"

REM Remove old package if exists
if exist ThreeMaze-LoopMe.zip del ThreeMaze-LoopMe.zip

REM Create zip using PowerShell (Windows built-in)
powershell -Command "& {Compress-Archive -Path 'ThreeMaze\index.html', 'ThreeMaze\css', 'ThreeMaze\js', 'ThreeMaze\assets' -DestinationPath 'ThreeMaze-LoopMe.zip' -Force}"

REM Check file size
powershell -Command "& {$size = (Get-Item 'ThreeMaze-LoopMe.zip').Length / 1MB; Write-Host ('Package size: {0:N2} MB' -f $size); if ($size -gt 8) {Write-Host 'WARNING: File exceeds 8MB LoopMe limit!' -ForegroundColor Red} else {Write-Host 'SUCCESS: File is under 8MB limit!' -ForegroundColor Green}}"

echo.
echo Package created: ThreeMaze-LoopMe.zip
echo Location: %cd%\ThreeMaze-LoopMe.zip
pause
