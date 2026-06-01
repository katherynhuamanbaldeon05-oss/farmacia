/**
 * Entidad Cliente
 * Representa un cliente de la farmacia
 */
class Cliente {
  constructor(id, nombre, dni, apellido, email, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.dni = dni;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.puntos = 0;
    this.fechaRegistro = new Date();
  }

  /**
   * Acumula puntos por compra (S/10 = 1 punto)
   */
  acumularPuntos(monto) {
    const puntosGanados = Math.floor(monto / 10);
    this.puntos += puntosGanados;
    return puntosGanados;
  }

  /**
   * Obtiene el descuento según los puntos acumulados
   */
  obtenerDescuento() {
    if (this.puntos >= 100) {
      return 10; // 10%
    } else if (this.puntos >= 50) {
      return 5; // 5%
    }
    return 0;
  }

  /**
   * Canjea puntos por descuento
   */
  canjearPuntos(puntos) {
    if (this.puntos < puntos) {
      throw new Error('Puntos insuficientes');
    }
    this.puntos -= puntos;
  }
}

module.exports = Cliente;
