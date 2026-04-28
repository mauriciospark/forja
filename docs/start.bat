@echo off
chcp 65001 >nul
echo ==========================================
echo  WINSOFT FORJA v1.0.0
echo  Iniciando servidor local...
echo ==========================================
echo.

:: Tenta iniciar com Python primeiro
python -m http.server 8080 2>nul
if %errorlevel% == 0 (
    echo Servidor iniciado em http://localhost:8080
    pause
    exit
)

:: Tenta com Python3
python3 -m http.server 8080 2>nul
if %errorlevel% == 0 (
    echo Servidor iniciado em http://localhost:8080
    pause
    exit
)

:: Tenta com Node (http-server)
npx http-server -p 8080 2>nul
if %errorlevel% == 0 (
    echo Servidor iniciado em http://localhost:8080
    pause
    exit
)

echo ERRO: Nenhum servidor encontrado.
echo Instale Python ou Node.js, ou use o VS Code com Live Server.
pause
