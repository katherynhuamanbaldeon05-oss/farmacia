@echo off
REM Script para instalar y configurar el Sistema de Gestión de Farmacia
REM Este script debe ejecutarse en la carpeta raíz del proyecto

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Sistema de Gestión de Farmacia - Configurador             ║
echo ║  Arquitectura Hexagonal                                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo    Descárgalo de https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detectado: %cd%

REM Crear archivo .env si no existe
if not exist .env (
    echo.
    echo 📝 Creando archivo .env...
    copy .env.example .env >nul
    echo ✅ Archivo .env creado
) else (
    echo ✅ Archivo .env ya existe
)

REM Instalar dependencias
echo.
echo 📦 Instalando dependencias con npm...
call npm install

if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ✅ Dependencias instaladas correctamente

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  PASOS SIGUIENTES:                                          ║
echo ╠════════════════════════════════════════════════════════════╣
echo ║                                                              ║
echo ║  1. Abre phpMyAdmin en http://localhost/phpmyadmin         ║
echo ║                                                              ║
echo ║  2. Ve a la pestaña SQL                                    ║
echo ║                                                              ║
echo ║  3. Abre el archivo: database/scripts/schema.sql           ║
echo ║                                                              ║
echo ║  4. Copia y pega el contenido en phpMyAdmin                ║
echo ║                                                              ║
echo ║  5. Haz clic en Ejecutar                                   ║
echo ║                                                              ║
echo ║  6. Vuelve aquí y ejecuta: npm start                       ║
echo ║                                                              ║
echo ║  7. Abre http://localhost:3000 en tu navegador             ║
echo ║                                                              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

pause
