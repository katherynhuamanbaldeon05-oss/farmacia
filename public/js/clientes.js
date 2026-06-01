/**
 * Gestión de Clientes
 */
let clientes = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarClientes();
  inicializarEventos();
});

async function cargarClientes() {
  try {
    const resultado = await APIClient.get('/clientes');
    clientes = resultado.datos;
    renderizarClientes(clientes);
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al cargar clientes', 'danger');
  }
}

function renderizarClientes(lista) {
  const tbody = document.getElementById('clientesBody');
  
  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No hay clientes</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(cliente => {
    const beneficio = obtenerNivelDescuento(cliente.puntos);
    const badgeClase = cliente.puntos >= 100 ? 'bg-danger' : cliente.puntos >= 50 ? 'bg-warning' : cliente.puntos >= 20 ? 'bg-info text-dark' : 'bg-secondary';
    
    return `
      <tr>
        <td><strong>#${cliente.id}</strong></td>
        <td>${cliente.nombre} ${cliente.apellido}</td>
        <td><strong>${cliente.dni}</strong></td>
        <td>${cliente.email || '-'}</td>
        <td>${cliente.telefono || '-'}</td>
        <td><span class="badge ${badgeClase}">${cliente.puntos} pts</span></td>
        <td><small class="text-muted">${beneficio}</small></td>
        <td>
          <button class="btn btn-sm btn-info" onclick="verDetallesCliente(${cliente.id})">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function inicializarEventos() {
  document.getElementById('btnGuardarCliente').addEventListener('click', guardarCliente);
  document.getElementById('btnBuscarDNI').addEventListener('click', buscarPorDNI);
  document.getElementById('buscarDNI').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') buscarPorDNI();
  });

  document.getElementById('clienteModal').addEventListener('hidden.bs.modal', resetForm);
}

async function buscarPorDNI() {
  const dni = document.getElementById('buscarDNI').value.trim();
  
  if (!dni) {
    renderizarClientes(clientes);
    return;
  }

  try {
    const resultado = await APIClient.get(`/clientes/dni/${dni}`);
    renderizarClientes([resultado.datos]);
  } catch (error) {
    if (error.message.includes('404')) {
      mostrarAlerta('Cliente no encontrado', 'info');
      renderizarClientes([]);
    } else {
      mostrarAlerta('Error al buscar cliente', 'danger');
    }
  }
}

async function guardarCliente() {
  const datos = {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    dni: document.getElementById('dni').value,
    email: document.getElementById('email').value,
    telefono: document.getElementById('telefono').value
  };

  if (!datos.nombre || !datos.apellido || !datos.dni) {
    mostrarAlerta('Complete los campos requeridos', 'warning');
    return;
  }

  if (!/^\d{8}$/.test(datos.dni)) {
    mostrarAlerta('DNI debe tener 8 dígitos', 'warning');
    return;
  }

  try {
    await APIClient.post('/clientes', datos);
    mostrarAlerta('Cliente registrado correctamente', 'success');
    bootstrap.Modal.getInstance(document.getElementById('clienteModal')).hide();
    await cargarClientes();
  } catch (error) {
    mostrarAlerta(error.message, 'danger');
  }
}

function verDetallesCliente(id) {
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    alert(`
Cliente: ${cliente.nombre} ${cliente.apellido}
DNI: ${cliente.dni}
Email: ${cliente.email || 'N/A'}
Teléfono: ${cliente.telefono || 'N/A'}
Puntos: ${cliente.puntos}
Beneficio: ${obtenerNivelDescuento(cliente.puntos)}
Registrado: ${formatearFecha(cliente.fecha_registro)}
    `);
  }
}

function resetForm() {
  document.getElementById('clienteForm').reset();
}
