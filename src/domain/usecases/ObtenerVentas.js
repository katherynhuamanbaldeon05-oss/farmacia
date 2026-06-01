/**
 * Caso de uso: Obtener Ventas
 */
class ObtenerVentas {
  constructor(ventaRepository) {
    this.ventaRepository = ventaRepository;
  }

  async ejecutar() {
    return await this.ventaRepository.obtenerTodas();
  }

  async obtenerPorCliente(clienteId) {
    return await this.ventaRepository.obtenerPorCliente(clienteId);
  }

  async obtenerPorFechas(fechaInicio, fechaFin) {
    return await this.ventaRepository.obtenerPorFechas(fechaInicio, fechaFin);
  }
}

module.exports = ObtenerVentas;
