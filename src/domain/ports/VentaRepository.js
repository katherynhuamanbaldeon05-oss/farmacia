/**
 * Puerto VentaRepository
 * Define las operaciones para el repositorio de ventas
 */
class VentaRepository {
  /**
   * Crear una venta
   * @param {Venta} venta
   */
  async crear(venta) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener venta por ID
   * @param {number} id
   */
  async obtenerPorId(id) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener todas las ventas
   */
  async obtenerTodas() {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener ventas por cliente
   * @param {number} clienteId
   */
  async obtenerPorCliente(clienteId) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener ventas por rango de fechas
   * @param {Date} fechaInicio
   * @param {Date} fechaFin
   */
  async obtenerPorFechas(fechaInicio, fechaFin) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener detalles de venta
   * @param {number} ventaId
   */
  async obtenerDetalles(ventaId) {
    throw new Error('Método no implementado');
  }

  /**
   * Crear detalle de venta
   */
  async crearDetalle(detalle) {
    throw new Error('Método no implementado');
  }
}

module.exports = VentaRepository;
