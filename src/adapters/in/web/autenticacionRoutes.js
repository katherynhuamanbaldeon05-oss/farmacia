/**
 * Rutas: Autenticación
 */
const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');

module.exports = (autenticacionController) => {
  const router = express.Router();

  // Login
  router.post('/login', (req, res) => autenticacionController.login(req, res));

  // Obtener perfil (requiere token)
  router.get('/perfil', AuthMiddleware.verifyToken, (req, res) => 
    autenticacionController.obtenerPerfil(req, res)
  );

  // Logout
  router.post('/logout', AuthMiddleware.verifyToken, (req, res) => 
    autenticacionController.logout(req, res)
  );

  return router;
};
