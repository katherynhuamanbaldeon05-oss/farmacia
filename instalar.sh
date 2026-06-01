#!/bin/bash

# Script de instalación para Linux/macOS

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Sistema de Gestión de Farmacia - Configurador             ║"
echo "║  Arquitectura Hexagonal                                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "   Descárgalo de https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"

# Crear .env
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creando archivo .env..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
else
    echo "✅ Archivo .env ya existe"
fi

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias con npm..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "✅ Dependencias instaladas correctamente"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PASOS SIGUIENTES:                                          ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║                                                              ║"
echo "║  1. Abre phpMyAdmin en http://localhost/phpmyadmin         ║"
echo "║                                                              ║"
echo "║  2. Ve a la pestaña SQL                                    ║"
echo "║                                                              ║"
echo "║  3. Abre el archivo: database/scripts/schema.sql           ║"
echo "║                                                              ║"
echo "║  4. Copia y pega el contenido en phpMyAdmin                ║"
echo "║                                                              ║"
echo "║  5. Haz clic en Ejecutar                                   ║"
echo "║                                                              ║"
echo "║  6. Ejecuta: npm start                                     ║"
echo "║                                                              ║"
echo "║  7. Abre http://localhost:3000 en tu navegador             ║"
echo "║                                                              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
