/**
 * API Helper - Funciones reutilizables para comunicación con el servidor
 */
const API_URL = 'http://localhost:3000/api';

class APIClient {
  static async request(endpoint, method = 'GET', data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Agregar token JWT si existe
    const token = localStorage.getItem('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, options);
      
      // Si no está autorizado, redirigir a login
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/login.html';
        throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error en la solicitud');
      }

      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static get(endpoint) {
    return this.request(endpoint, 'GET');
  }

  static post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  }

  static put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  }

  static delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }
}

/**
 * Función para mostrar alertas
 */
function mostrarAlerta(mensaje, tipo = 'info', duracion = 3000) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  const container = document.querySelector('.container-fluid') || document.body;
  container.insertBefore(alertDiv, container.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, duracion);
}

/**
 * Función para formatear moneda
 */
function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

/**
 * Función para formatear fecha
 */
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Función para obtener el estado del stock
 */
function obtenerEstadoStock(cantidad, alerta) {
  if (cantidad < alerta) {
    return { clase: 'status-critico', texto: 'Crítico' };
  } else if (cantidad < alerta * 2) {
    return { clase: 'status-bajo', texto: 'Bajo' };
  }
  return { clase: 'status-normal', texto: 'Normal' };
}

/**
 * Función para obtener el nivel de descuento
 */
function obtenerNivelDescuento(puntos) {
  if (puntos >= 100) {
    return '10% descuento';
  } else if (puntos >= 50) {
    return '5% descuento';
  }
  return 'Sin descuento';
}
