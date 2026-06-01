/**
 * Caso de uso: Actualizar Medicamento
 */
class ActualizarMedicamento {
  constructor(medicamentoRepository) {
    this.medicamentoRepository = medicamentoRepository;
  }

  async ejecutar(id, nombre, descripcion, precio, cantidad) {
    if (!id) {
      throw new Error('ID de medicamento requerido');
    }

    const medicamento = await this.medicamentoRepository.obtenerPorId(id);
    if (!medicamento) {
      throw new Error('Medicamento no encontrado');
    }

    const datosActualizados = {
      nombre: nombre || medicamento.nombre,
      descripcion: descripcion || medicamento.descripcion,
      precio: precio !== undefined ? precio : medicamento.precio,
      cantidad: cantidad !== undefined ? cantidad : medicamento.cantidad
    };

    return await this.medicamentoRepository.actualizar(id, datosActualizados);
  }
}

module.exports = ActualizarMedicamento;
