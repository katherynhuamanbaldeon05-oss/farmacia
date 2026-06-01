/**
 * Adaptador: Implementación de AlertaStockPort
 * Envía alertas cuando el stock es bajo
 */
const AlertaStockPort = require('../../../domain/ports/AlertaStockPort');

class AlertaStockConsola extends AlertaStockPort {
  async enviarAlerta(medicamento) {
    const mensaje = `
    ⚠️ ALERTA DE STOCK BAJO ⚠️
    ========================
    Medicamento: ${medicamento.nombre}
    Stock actual: ${medicamento.cantidad} unidades
    Límite de alerta: ${medicamento.alertaStock} unidades
    Fecha/Hora: ${new Date().toLocaleString()}
    ========================
    `;
    console.log(mensaje);
    return true;
  }

  async enviarMultiples(medicamentos) {
    console.log(`\n🔔 Se encontraron ${medicamentos.length} medicamentos con stock bajo\n`);
    for (const medicamento of medicamentos) {
      await this.enviarAlerta(medicamento);
    }
    return true;
  }
}

module.exports = AlertaStockConsola;
