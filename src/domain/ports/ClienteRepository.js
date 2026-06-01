/**
 * Puerto ClienteRepository
 * Define las operaciones para el repositorio de clientes
 */
class ClienteRepository {
  /**
   * Crear un cliente
   * @param {Cliente} cliente
   */
  async crear(cliente) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener cliente por ID
   * @param {number} id
   */
  async obtenerPorId(id) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener cliente por DNI
   * @param {string} dni
   */
  async obtenerPorDNI(dni) {
    throw new Error('Método no implementado');
  }

  /**
   * Obtener todos los clientes
   */
  async obtenerTodos() {
    throw new Error('Método no implementado');
  }

  /**
   * Actualizar cliente
   * @param {number} id
   * @param {Cliente} cliente
   */
  async actualizar(id, cliente) {
    throw new Error('Método no implementado');
  }

  /**
   * Eliminar cliente
   * @param {number} id
   */
  async eliminar(id) {
    throw new Error('Método no implementado');
  }

  /**
   * Actualizar puntos de cliente
   * @param {number} id
   * @param {number} puntos
   */
  async actualizarPuntos(id, puntos) {
    throw new Error('Método no implementado');
  }
}

module.exports = ClienteRepository;
