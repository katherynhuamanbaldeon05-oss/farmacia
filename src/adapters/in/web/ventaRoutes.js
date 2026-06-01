/**
 * Rutas de Ventas
 */
const express = require('express');
const router = express.Router();

module.exports = (ventaController) => {
  router.post('/', (req, res) => ventaController.procesar(req, res));
  router.get('/', (req, res) => {
    if (req.query.fechaInicio && req.query.fechaFin) {
      ventaController.obtenerPorFechas(req, res);
    } else {
      ventaController.obtenerTodas(req, res);
    }
  });
  router.get('/stock-bajo', (req, res) => ventaController.verificarStockBajo(req, res));
  router.get('/cliente/:clienteId', (req, res) => ventaController.obtenerPorCliente(req, res));

  return router;
};
