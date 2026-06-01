/**
 * Caso de uso: Procesar Venta
 */
const Venta = require('../entities/Venta');
const DetalleVenta = require('../entities/DetalleVenta');

class ProcesarVenta {
  constructor(ventaRepository, medicamentoRepository, clienteRepository, alertaStockPort) {
    this.ventaRepository = ventaRepository;
    this.medicamentoRepository = medicamentoRepository;
    this.clienteRepository = clienteRepository;
    this.alertaStockPort = alertaStockPort;
  }

  async ejecutar(clienteId, detallesVenta) {
    if (!clienteId || !detallesVenta || detallesVenta.length === 0) {
      throw new Error('Cliente y detalles de venta requeridos');
    }

    // Obtener cliente
    const cliente = await this.clienteRepository.obtenerPorId(clienteId);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    // Validar stock y obtener detalles completos
    const detallesProcessados = [];
    let total = 0;

    for (const detalle of detallesVenta) {
      const medicamento = await this.medicamentoRepository.obtenerPorId(detalle.medicamentoId);
      if (!medicamento) {
        throw new Error(`Medicamento ${detalle.medicamentoId} no encontrado`);
      }

      if (medicamento.cantidad < detalle.cantidad) {
        throw new Error(`Stock insuficiente para ${medicamento.nombre}`);
      }

      const subtotal = detalle.cantidad * medicamento.precio;
      total += subtotal;

      detallesProcessados.push({
        medicamentoId: detalle.medicamentoId,
        cantidad: detalle.cantidad,
        precioUnitario: medicamento.precio,
        subtotal
      });
    }

    // Crear venta
    const venta = new Venta(null, clienteId, new Date(), total);

    // Aplicar descuento si es cliente con puntos
    const descuento = cliente.puntos >= 50 ? (cliente.puntos >= 100 ? 10 : 5) : 0;
    const totalFinal = descuento > 0 ? venta.aplicarDescuento(descuento) : total;

    // Guardar venta
    const ventaGuardada = await this.ventaRepository.crear({
      clienteId,
      fecha: new Date(),
      total: totalFinal,
      descuentoAplicado: venta.descuentoAplicado
    });

    // Guardar detalles y actualizar stock
    for (const detalle of detallesProcessados) {
      await this.ventaRepository.crearDetalle({
        ventaId: ventaGuardada.id,
        medicamentoId: detalle.medicamentoId,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario
      });

      // Actualizar stock
      const medicamento = await this.medicamentoRepository.obtenerPorId(detalle.medicamentoId);
      medicamento.cantidad -= detalle.cantidad;
      await this.medicamentoRepository.actualizar(detalle.medicamentoId, medicamento);

      // Verificar stock bajo
      if (medicamento.cantidad < medicamento.alertaStock) {
        await this.alertaStockPort.enviarAlerta(medicamento);
      }
    }

    // Acumular puntos (S/10 = 1 punto)
    const puntosGanados = Math.floor(totalFinal / 10);
    cliente.puntos += puntosGanados;
    await this.clienteRepository.actualizarPuntos(clienteId, cliente.puntos);

    return {
      venta: ventaGuardada,
      totalFinal,
      descuentoAplicado: venta.descuentoAplicado,
      puntosGanados,
      puntosActuales: cliente.puntos
    };
  }
}

module.exports = ProcesarVenta;
