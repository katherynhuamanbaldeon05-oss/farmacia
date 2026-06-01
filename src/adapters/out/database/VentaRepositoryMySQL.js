/**
 * Adaptador: Implementación de VentaRepository con MySQL
 */
const VentaRepository = require('../../../domain/ports/VentaRepository');
const pool = require('./connection');

class VentaRepositoryMySQL extends VentaRepository {
  async crear(venta) {
    const { clienteId, fecha, total, descuentoAplicado } = venta;
    const query = 'INSERT INTO ventas (cliente_id, fecha, total, descuento_aplicado) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [clienteId, fecha, total, descuentoAplicado || 0]);
    return { id: result.insertId, ...venta };
  }

  async obtenerPorId(id) {
    const query = 'SELECT * FROM ventas WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerTodas() {
    const query = `
      SELECT v.*, c.nombre as cliente_nombre, c.dni 
      FROM ventas v 
      JOIN clientes c ON v.cliente_id = c.id 
      ORDER BY v.fecha DESC
    `;
    const [rows] = await pool.execute(query);
    return rows;
  }

  async obtenerPorCliente(clienteId) {
    const query = 'SELECT * FROM ventas WHERE cliente_id = ? ORDER BY fecha DESC';
    const [rows] = await pool.execute(query, [clienteId]);
    return rows;
  }

  async obtenerPorFechas(fechaInicio, fechaFin) {
    const query = 'SELECT * FROM ventas WHERE fecha BETWEEN ? AND ? ORDER BY fecha DESC';
    const [rows] = await pool.execute(query, [fechaInicio, fechaFin]);
    return rows;
  }

  async obtenerDetalles(ventaId) {
    const query = `
      SELECT dv.*, m.nombre as medicamento_nombre 
      FROM detalles_venta dv 
      JOIN medicamentos m ON dv.medicamento_id = m.id 
      WHERE dv.venta_id = ?
    `;
    const [rows] = await pool.execute(query, [ventaId]);
    return rows;
  }

  async crearDetalle(detalle) {
    const { ventaId, medicamentoId, cantidad, precioUnitario } = detalle;
    const query = 'INSERT INTO detalles_venta (venta_id, medicamento_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
    const [result] = await pool.execute(query, [ventaId, medicamentoId, cantidad, precioUnitario]);
    return { id: result.insertId, ...detalle };
  }
}

module.exports = VentaRepositoryMySQL;
