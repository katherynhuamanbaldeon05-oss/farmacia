/**
 * Punto de entrada de la aplicación
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const DIContainer = require('./application/DIContainer');
const medicamentoRoutes = require('./adapters/in/web/medicamentoRoutes');
const clienteRoutes = require('./adapters/in/web/clienteRoutes');
const ventaRoutes = require('./adapters/in/web/ventaRoutes');
const autenticacionRoutes = require('./adapters/in/web/autenticacionRoutes');
const AuthMiddleware = require('./adapters/in/middleware/AuthMiddleware');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde public
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Inyección de dependencias
const container = new DIContainer();

// Rutas de Autenticación (públicas)
app.use('/api/auth', autenticacionRoutes(container.get('autenticacionController')));

// Rutas API (protegidas)
app.use('/api/medicamentos', AuthMiddleware.verifyToken, medicamentoRoutes(container.get('medicamentoController')));
app.use('/api/clientes', AuthMiddleware.verifyToken, clienteRoutes(container.get('clienteController')));
app.use('/api/ventas', AuthMiddleware.verifyToken, ventaRoutes(container.get('ventaController')));

// Ruta raíz - Servir página principal
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../public/html/index.html');
  
  // Leer y enviar el archivo
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({
        exito: false,
        error: 'Error al leer el archivo'
      });
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(data);
  });
});

// Ruta para index.html
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

// Rutas para páginas individuales
app.get('/medicamentos.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/medicamentos.html'));
});

app.get('/clientes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/clientes.html'));
});

app.get('/ventas.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/ventas.html'));
});

app.get('/reportes.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/reportes.html'));
});

app.get('/test-api.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/test-api.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    exito: false,
    error: 'Error interno del servidor',
    mensaje: err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    error: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║  Sistema de Gestión de Farmacia                            ║
  ║  Arquitectura Hexagonal con Node.js y Express              ║
  ╚════════════════════════════════════════════════════════════╝
  
  🚀 Servidor iniciado en: http://localhost:${PORT}
  📊 API disponible en: http://localhost:${PORT}/api
  🏠 Página principal: http://localhost:${PORT}
  
  🗄️  Base de datos: ${process.env.DB_NAME || 'farmacia_db'}
  🔧 Ambiente: ${process.env.NODE_ENV || 'development'}
  
  Presiona Ctrl+C para detener el servidor
  `);
});

module.exports = app;
