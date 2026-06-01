/**
 * Utilidades de Autenticación
 */
class AuthUtil {
  static getToken() {
    return localStorage.getItem('token');
  }

  static getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static setUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  static isAutenticado() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/login.html';
  }

  static requiereAutenticacion() {
    if (!this.isAutenticado()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  }
}
