/**
 * Entidad DetalleVenta
 * Representa cada línea de una venta
 */
class DetalleVenta {
  constructor(ventaId, medicamentoId, cantidad, precioUnitario) {
    this.ventaId = ventaId;
    this.medicamentoId = medicamentoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }

  /**
   * Calcula el subtotal de este detalle
   */
  calcularSubtotal() {
    return this.cantidad * this.precioUnitario;
  }
}

module.exports = DetalleVenta;
