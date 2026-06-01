/**
 * Rutas de Clientes
 */
const express = require('express');
const router = express.Router();

module.exports = (clienteController) => {
  router.post('/', (req, res) => clienteController.registrar(req, res));
  router.get('/', (req, res) => clienteController.obtenerTodos(req, res));
  router.get('/:id', (req, res) => clienteController.obtenerPorId(req, res));
  router.get('/dni/:dni', (req, res) => clienteController.obtenerPorDNI(req, res));

  return router;
};
