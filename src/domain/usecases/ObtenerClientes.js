/**
 * Caso de uso: Obtener Clientes
 */
class ObtenerClientes {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async ejecutar() {
    return await this.clienteRepository.obtenerTodos();
  }

  async obtenerPorDNI(dni) {
    return await this.clienteRepository.obtenerPorDNI(dni);
  }

  async obtenerPorId(id) {
    return await this.clienteRepository.obtenerPorId(id);
  }
}

module.exports = ObtenerClientes;
