:: 📱 Script para Iniciar Mentor de Carreira no Celular
:: Este arquivo facilita o acesso mobile à aplicação

@echo off
cls
echo ================================
echo 🚀 MENTOR DE CARREIRA IA - MOBILE
echo ================================
echo.

:: Obter IP da máquina
echo 📡 Detectando IP da máquina...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%i
    set IP=!IP: =!
    goto :found
)
:found

:: Definir porta
set PORT=3000

echo.
echo ✅ Aplicação será acessível em:
echo.
echo 🌐 http://localhost:%PORT%
echo 📱 http://%IP%:%PORT%
echo.
echo ================================
echo 📱 INSTRUÇÕES PARA CELULAR
echo ================================
echo.
echo 1️⃣ Conecte o celular na MESMA rede WiFi
echo 2️⃣ Abra o navegador do celular (Chrome/Safari)
echo 3️⃣ Digite: http://%IP%:%PORT%
echo 4️⃣ Permita acesso ao microfone quando solicitado
echo 5️⃣ Toque "Adicionar à tela inicial" para instalar como app
echo.
echo 🎤 COMANDOS DE VOZ DISPONÍVEIS:
echo    • "analisar currículo"
echo    • "simular entrevista" 
echo    • "buscar vagas"
echo    • "página inicial"
echo.
echo ⏳ Iniciando servidor Next.js...
echo.

:: Tentar diferentes formas de iniciar o Next.js
if exist "node_modules\.bin\next" (
    echo 🔧 Usando executável local do Next.js...
    call node_modules\.bin\next dev -p %PORT%
) else if exist "package.json" (
    echo 🔧 Tentando npm start...
    npm start
) else (
    echo ❌ Erro: Next.js não encontrado!
    echo 💡 Execute: npm install
    pause
)

pause