/**
 * Middleware de Autenticación con JWT
 */
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'tu-clave-secreta-muy-segura-2026';

class AuthMiddleware {
  static generateToken(usuario) {
    return jwt.sign(
      {
        id: usuario.id,
        usuario: usuario.usuario,
        rol: usuario.rol
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
  }

  static verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          exito: false,
          error: 'No autorizado - Token requerido'
        });
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        exito: false,
        error: 'Token inválido o expirado'
      });
    }
  }

  static verifyRole(rolesPermitidos = []) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          exito: false,
          error: 'No autorizado'
        });
      }

      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({
          exito: false,
          error: 'No tiene permisos para esta acción'
        });
      }

      next();
    };
  }
}

module.exports = AuthMiddleware;
