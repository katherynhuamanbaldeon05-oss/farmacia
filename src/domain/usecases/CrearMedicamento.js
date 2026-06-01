/**
 * Caso de uso: Crear Medicamento
 */
class CrearMedicamento {
  constructor(medicamentoRepository) {
    this.medicamentoRepository = medicamentoRepository;
  }

  async ejecutar(nombre, descripcion, precio, cantidad) {
    if (!nombre || !precio || cantidad === undefined) {
      throw new Error('Datos incompletos para crear medicamento');
    }

    if (precio <= 0 || cantidad < 0) {
      throw new Error('Precio debe ser positivo y cantidad no negativa');
    }

    const medicamento = {
      nombre,
      descripcion,
      precio,
      cantidad,
      alertaStock: 5
    };

    return await this.medicamentoRepository.crear(medicamento);
  }
}

module.exports = CrearMedicamento;
