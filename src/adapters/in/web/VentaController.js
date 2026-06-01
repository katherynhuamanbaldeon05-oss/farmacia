/**
 * Controlador: Ventas
 */
class VentaController {
  constructor(procesarVenta, obtenerVentas, verificarStockBajo) {
    this.procesarVenta = procesarVenta;
    this.obtenerVentas = obtenerVentas;
    this.verificarStockBajo = verificarStockBajo;
  }

  async procesar(req, res) {
    try {
      const { clienteId, detalles } = req.body;
      const resultado = await this.procesarVenta.ejecutar(clienteId, detalles);
      res.status(201).json({ exito: true, datos: resultado });
    } catch (error) {
      res.status(400).json({ exito: false, error: error.message });
    }
  }

  async obtenerTodas(req, res) {
    try {
      const ventas = await this.obtenerVentas.ejecutar();
      res.json({ exito: true, datos: ventas });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerPorCliente(req, res) {
    try {
      const { clienteId } = req.params;
      const ventas = await this.obtenerVentas.obtenerPorCliente(clienteId);
      res.json({ exito: true, datos: ventas });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerPorFechas(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const ventas = await this.obtenerVentas.obtenerPorFechas(fechaInicio, fechaFin);
      res.json({ exito: true, datos: ventas });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async verificarStockBajo(req, res) {
    try {
      const medicamentos = await this.verificarStockBajo.ejecutar();
      res.json({ exito: true, datos: medicamentos });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }
}

module.exports = VentaController;
