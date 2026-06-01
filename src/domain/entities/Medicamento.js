/**
 * Entidad Medicamento
 * Representa un medicamento en la farmacia
 */
class Medicamento {
  constructor(id, nombre, descripcion, precio, cantidad, alertaStock = 5) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.alertaStock = alertaStock;
    this.fechaCreacion = new Date();
  }

  /**
   * Valida si el medicamento tiene stock bajo
   */
  tieneStockBajo() {
    return this.cantidad < this.alertaStock;
  }

  /**
   * Reduce el stock por una compra
   */
  reducirStock(cantidad) {
    if (this.cantidad < cantidad) {
      throw new Error('Stock insuficiente');
    }
    this.cantidad -= cantidad;
  }

  /**
   * Aumenta el stock
   */
  aumentarStock(cantidad) {
    this.cantidad += cantidad;
  }
}

module.exports = Medicamento;
