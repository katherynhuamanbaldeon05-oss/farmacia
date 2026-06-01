/**
 * Puerto AlertaStockPort
 * Define la interfaz para enviar alertas de stock bajo
 */
class AlertaStockPort {
  /**
   * Enviar alerta de stock bajo
   * @param {Medicamento} medicamento
   */
  async enviarAlerta(medicamento) {
    throw new Error('Método no implementado');
  }

  /**
   * Enviar múltiples alertas
   * @param {Array<Medicamento>} medicamentos
   */
  async enviarMultiples(medicamentos) {
    throw new Error('Método no implementado');
  }
}

module.exports = AlertaStockPort;
