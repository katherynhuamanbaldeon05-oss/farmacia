/**
 * Rutas de Medicamentos
 */
const express = require('express');
const router = express.Router();

module.exports = (medicamentoController) => {
  router.post('/', (req, res) => medicamentoController.crear(req, res));
  router.get('/', (req, res) => {
    if (req.query.nombre) {
      medicamentoController.buscar(req, res);
    } else {
      medicamentoController.obtenerTodos(req, res);
    }
  });
  router.get('/stock-bajo', (req, res) => medicamentoController.obtenerStockBajo(req, res));
  router.get('/:id', (req, res) => medicamentoController.obtenerPorId(req, res));
  router.put('/:id', (req, res) => medicamentoController.actualizar(req, res));
  router.delete('/:id', (req, res) => medicamentoController.eliminar(req, res));

  return router;
};
