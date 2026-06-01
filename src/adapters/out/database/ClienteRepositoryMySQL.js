/**
 * Adaptador: Implementación de ClienteRepository con MySQL
 */
const ClienteRepository = require('../../../domain/ports/ClienteRepository');
const pool = require('./connection');

class ClienteRepositoryMySQL extends ClienteRepository {
  async crear(cliente) {
    const { nombre, dni, apellido, email, telefono, puntos } = cliente;
    const query = 'INSERT INTO clientes (nombre, dni, apellido, email, telefono, puntos) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [nombre, dni, apellido, email, telefono, puntos || 0]);
    return { id: result.insertId, ...cliente };
  }

  async obtenerPorId(id) {
    const query = 'SELECT * FROM clientes WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerPorDNI(dni) {
    const query = 'SELECT * FROM clientes WHERE dni = ?';
    const [rows] = await pool.execute(query, [dni]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerTodos() {
    const query = 'SELECT * FROM clientes ORDER BY nombre ASC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  async actualizar(id, cliente) {
    const { nombre, apellido, email, telefono, puntos } = cliente;
    const query = 'UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, puntos = ? WHERE id = ?';
    await pool.execute(query, [nombre, apellido, email, telefono, puntos, id]);
    return { id, ...cliente };
  }

  async eliminar(id) {
    const query = 'DELETE FROM clientes WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }

  async actualizarPuntos(id, puntos) {
    const query = 'UPDATE clientes SET puntos = ? WHERE id = ?';
    await pool.execute(query, [puntos, id]);
    return puntos;
  }
}

module.exports = ClienteRepositoryMySQL;
