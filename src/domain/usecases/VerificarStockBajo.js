/**
 * Caso de uso: Verificar Stock Bajo
 */
class VerificarStockBajo {
  constructor(medicamentoRepository, alertaStockPort) {
    this.medicamentoRepository = medicamentoRepository;
    this.alertaStockPort = alertaStockPort;
  }

  async ejecutar() {
    const medicamentosConStockBajo = await this.medicamentoRepository.obtenerStockBajo();
    
    if (medicamentosConStockBajo.length > 0) {
      await this.alertaStockPort.enviarMultiples(medicamentosConStockBajo);
    }

    return medicamentosConStockBajo;
  }
}

module.exports = VerificarStockBajo;
