/**
 * Caso de uso: Registrar Cliente
 */
class RegistrarCliente {
  constructor(clienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async ejecutar(nombre, dni, apellido, email, telefono) {
    if (!nombre || !dni || !apellido) {
      throw new Error('Nombre, DNI y apellido son requeridos');
    }

    // Validar formato de DNI (números)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error('DNI debe tener 8 dígitos');
    }

    // Verificar si DNI ya existe
    const clienteExistente = await this.clienteRepository.obtenerPorDNI(dni);
    if (clienteExistente) {
      throw new Error('DNI ya registrado');
    }

    const cliente = {
      nombre,
      dni,
      apellido,
      email,
      telefono,
      puntos: 0
    };

    return await this.clienteRepository.crear(cliente);
  }
}

module.exports = RegistrarCliente;
