/**
 * Entidad Venta
 * Representa una venta realizada en la farmacia
 */
class Venta {
  constructor(id, clienteId, fecha, total) {
    this.id = id;
    this.clienteId = clienteId;
    this.fecha = fecha || new Date();
    this.total = total;
    this.detalles = [];
    this.descuentoAplicado = 0;
  }

  /**
   * Agrega un detalle a la venta
   */
  agregarDetalle(detalle) {
    this.detalles.push(detalle);
  }

  /**
   * Calcula el total de la venta
   */
  calcularTotal() {
    this.total = this.detalles.reduce((sum, detalle) => {
      return sum + (detalle.cantidad * detalle.precioUnitario);
    }, 0);
    return this.total;
  }

  /**
   * Aplica descuento a la venta
   */
  aplicarDescuento(porcentaje) {
    this.descuentoAplicado = (this.total * porcentaje) / 100;
    return this.total - this.descuentoAplicado;
  }
}

module.exports = Venta;
