/**
 * Controlador: Autenticación
 */
const bcrypt = require('bcryptjs');
const AuthMiddleware = require('../middleware/AuthMiddleware');

class AutenticacionController {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async login(req, res) {
    try {
      const { usuario, contrasena } = req.body;

      if (!usuario || !contrasena) {
        return res.status(400).json({
          exito: false,
          error: 'Usuario y contraseña requeridos'
        });
      }

      // Obtener usuario de la BD por usuario o email
      const usuarioDb = await this.usuarioRepository.obtenerPorUsuarioOEmail(usuario);

      if (!usuarioDb) {
        return res.status(401).json({
          exito: false,
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, usuarioDb.contrasena);

      if (!contrasenaValida) {
        return res.status(401).json({
          exito: false,
          error: 'Usuario o contraseña incorrectos'
        });
      }

      // Generar token JWT
      const token = AuthMiddleware.generateToken(usuarioDb);

      res.json({
        exito: true,
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id: usuarioDb.id,
          nombre: usuarioDb.nombre,
          usuario: usuarioDb.usuario,
          rol: usuarioDb.rol,
          email: usuarioDb.email
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        exito: false,
        error: 'Error en el servidor'
      });
    }
  }

  async obtenerPerfil(req, res) {
    try {
      const usuario = await this.usuarioRepository.obtenerPorId(req.user.id);

      if (!usuario) {
        return res.status(404).json({
          exito: false,
          error: 'Usuario no encontrado'
        });
      }

      res.json({
        exito: true,
        datos: {
          id: usuario.id,
          nombre: usuario.nombre,
          usuario: usuario.usuario,
          email: usuario.email,
          rol: usuario.rol,
          activo: usuario.activo
        }
      });
    } catch (error) {
      res.status(500).json({
        exito: false,
        error: 'Error al obtener perfil'
      });
    }
  }

  async logout(req, res) {
    // El logout se maneja en el cliente eliminando el token
    res.json({
      exito: true,
      mensaje: 'Sesión cerrada correctamente'
    });
  }
}

module.exports = AutenticacionController;
