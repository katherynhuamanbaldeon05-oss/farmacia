# Sistema de Gestión de Farmacia

Aplicación web para la gestión completa de una farmacia utilizando **Arquitectura Hexagonal**.

## 🏗️ Arquitectura

```
src/
├── domain/              # Núcleo del negocio
│   ├── entities/        # Entidades del dominio
│   ├── ports/          # Interfaces/Puertos
│   └── usecases/       # Casos de uso
├── application/        # Servicios de aplicación
├── adapters/           # Adaptadores
│   ├── in/web/        # Controladores HTTP
│   └── out/           # Implementaciones de puertos
└── index.js           # Punto de entrada
```

## 🎯 Características

- ✅ Gestión de Medicamentos (CRUD)
- ✅ Gestión de Clientes por DNI
- ✅ Sistema de Fidelización con Puntos
- ✅ Gestión de Ventas e Inventario
- ✅ Alertas de Stock Bajo

## 📋 Requisitos

- Node.js v14+
- MySQL
- npm

## 🚀 Instalación

1. Clonar el repositorio
2. `npm install`
3. Configurar `.env` con credenciales de MySQL
4. Ejecutar scripts de base de datos en `database/scripts/`
5. `npm start` o `npm run dev`

## 📱 Tecnologías

- Node.js + Express
- MySQL
- HTML5 + CSS3 + Bootstrap
- JavaScript Vanilla

## 📝 Licencia

MIT
