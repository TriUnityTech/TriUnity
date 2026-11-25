@echo off
title TriUnity - Servidor Local
cd /d "%~dp0"

echo ============================================
echo   TriUnity - Iniciando site em modo local
echo   http://localhost:3000
echo ============================================
echo.
echo (Feche esta janela para parar o servidor)
echo.

rem Abre o navegador depois de alguns segundos, dando tempo do servidor subir
start /b cmd /c "timeout /t 25 /nobreak >nul & start http://localhost:3000"

if not exist node_modules (
  echo Instalando dependencias pela primeira vez, aguarde...
  call npm install
)

call npm run dev

pause
