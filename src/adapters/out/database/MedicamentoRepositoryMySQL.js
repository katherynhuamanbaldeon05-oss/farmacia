/**
 * Adaptador: Implementación de MedicamentoRepository con MySQL
 */
const MedicamentoRepository = require('../../../domain/ports/MedicamentoRepository');
const pool = require('./connection');

class MedicamentoRepositoryMySQL extends MedicamentoRepository {
  async crear(medicamento) {
    const { nombre, descripcion, precio, cantidad, alertaStock } = medicamento;
    const query = 'INSERT INTO medicamentos (nombre, descripcion, precio, cantidad, alerta_stock) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [nombre, descripcion, precio, cantidad, alertaStock || 5]);
    return { id: result.insertId, ...medicamento };
  }

  async obtenerPorId(id) {
    const query = 'SELECT * FROM medicamentos WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerTodos() {
    const query = 'SELECT * FROM medicamentos ORDER BY nombre ASC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  async actualizar(id, medicamento) {
    const { nombre, descripcion, precio, cantidad } = medicamento;
    const query = 'UPDATE medicamentos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id = ?';
    await pool.execute(query, [nombre, descripcion, precio, cantidad, id]);
    return { id, ...medicamento };
  }

  async eliminar(id) {
    const query = 'DELETE FROM medicamentos WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }

  async obtenerStockBajo() {
    const query = 'SELECT * FROM medicamentos WHERE cantidad < alerta_stock ORDER BY cantidad ASC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  async buscarPorNombre(nombre) {
    const query = 'SELECT * FROM medicamentos WHERE nombre LIKE ? ORDER BY nombre ASC';
    const [rows] = await pool.execute(query, [`%${nombre}%`]);
    return rows;
  }
}

module.exports = MedicamentoRepositoryMySQL;
