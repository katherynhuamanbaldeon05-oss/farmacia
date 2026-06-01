/**
 * Caso de uso: Eliminar Medicamento
 */
class EliminarMedicamento {
  constructor(medicamentoRepository) {
    this.medicamentoRepository = medicamentoRepository;
  }

  async ejecutar(id) {
    if (!id) {
      throw new Error('ID de medicamento requerido');
    }

    const medicamento = await this.medicamentoRepository.obtenerPorId(id);
    if (!medicamento) {
      throw new Error('Medicamento no encontrado');
    }

    return await this.medicamentoRepository.eliminar(id);
  }
}

module.exports = EliminarMedicamento;
