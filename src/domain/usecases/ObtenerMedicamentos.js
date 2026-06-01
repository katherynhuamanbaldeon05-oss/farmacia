/**
 * Caso de uso: Obtener Medicamentos
 */
class ObtenerMedicamentos {
  constructor(medicamentoRepository) {
    this.medicamentoRepository = medicamentoRepository;
  }

  async ejecutar() {
    return await this.medicamentoRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    return await this.medicamentoRepository.obtenerPorId(id);
  }

  async buscarPorNombre(nombre) {
    return await this.medicamentoRepository.buscarPorNombre(nombre);
  }

  async obtenerStockBajo() {
    return await this.medicamentoRepository.obtenerStockBajo();
  }
}

module.exports = ObtenerMedicamentos;
