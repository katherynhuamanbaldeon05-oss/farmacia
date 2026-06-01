/**
 * Puerto MedicamentoRepository
 * Define las operaciones para el repositorio de medicamentos
 */
class MedicamentoRepository {
  /**
   * Crear un medicamento
   * @param {Medicamento} medicamento
   */
  async crear(medicamento) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener medicamento por ID
   * @param {number} id
   */
  async obtenerPorId(id) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener todos los medicamentos
   */
  async obtenerTodos() {
    throw new Error('Método no implementado');
  }

  /**
   * Actualizar medicamento
   * @param {number} id
   * @param {Medicamento} medicamento
   */
  async actualizar(id, medicamento) {
    throw new Error('Método no implementado');
  }

  /**
   * Eliminar medicamento
   * @param {number} id
   */
  async eliminar(id) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener medicamentos con stock bajo
   */
  async obtenerStockBajo() {
    throw new Error('Método no implementado');
  }

  /**
   * Buscar medicamentos por nombre
   * @param {string} nombre
   */
  async buscarPorNombre(nombre) {
    throw new Error('Método no implementado');
  }
}

module.exports = MedicamentoRepository;
