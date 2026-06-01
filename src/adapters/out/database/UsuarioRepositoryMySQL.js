/**
 * Repositorio: Usuario (MySQL)
 */
const pool = require('./connection');
const bcrypt = require('bcryptjs');

class UsuarioRepositoryMySQL {
  async obtenerPorUsuario(usuario) {
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    const [rows] = await pool.execute(query, [usuario]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerPorUsuarioOEmail(identificador) {
    const query = 'SELECT * FROM usuarios WHERE usuario = ? OR email = ?';
    const [rows] = await pool.execute(query, [identificador, identificador]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerPorId(id) {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async obtenerTodos() {
    const query = 'SELECT id, nombre, email, usuario, rol, activo, fecha_creacion FROM usuarios ORDER BY fecha_creacion DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  async crear(usuario) {
    const { nombre, email, usuario: usr, contrasena, rol } = usuario;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const query = 'INSERT INTO usuarios (nombre, email, usuario, contrasena, rol) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.execute(query, [nombre, email, usr, hashedPassword, rol || 'vendedor']);
    return { id: result.insertId, ...usuario, contrasena: hashedPassword };
  }

  async actualizar(id, usuario) {
    const { nombre, email, rol, activo } = usuario;
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ?, activo = ? WHERE id = ?';
    await pool.execute(query, [nombre, email, rol, activo, id]);
    return { id, ...usuario };
  }

  async eliminar(id) {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = UsuarioRepositoryMySQL;
