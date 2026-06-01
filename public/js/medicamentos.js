/**
 * Gestión de Medicamentos
 */
let medicamentos = [];
let medicamentoActual = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Verificar autenticación
  AuthUtil.requiereAutenticacion();
  
  await cargarMedicamentos();
  inicializarEventos();
});

async function cargarMedicamentos() {
  try {
    const resultado = await APIClient.get('/medicamentos');
    medicamentos = resultado.datos;
    renderizarMedicamentos(medicamentos);
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al cargar medicamentos', 'danger');
  }
}

function renderizarMedicamentos(lista) {
  const tbody = document.getElementById('medicamentosBody');
  
  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay medicamentos</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(med => {
    const estado = obtenerEstadoStock(med.cantidad, med.alerta_stock);
    return `
      <tr>
        <td><strong>#${med.id}</strong></td>
        <td>${med.nombre}</td>
        <td>${med.descripcion || '-'}</td>
        <td>${formatearMoneda(med.precio)}</td>
        <td>${med.cantidad}</td>
        <td><span class="badge ${estado.clase}">${estado.texto}</span></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarMedicamento(${med.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="eliminarMedicamento(${med.id})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function inicializarEventos() {
  document.getElementById('btnBuscar').addEventListener('click', buscarMedicamentos);
  document.getElementById('buscarMedicamento').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') buscarMedicamentos();
  });

  document.getElementById('btnGuardarMedicamento').addEventListener('click', guardarMedicamento);

  // Reset modal al cerrar
  document.getElementById('medicamentoModal').addEventListener('hidden.bs.modal', resetForm);
}

async function buscarMedicamentos() {
  const nombre = document.getElementById('buscarMedicamento').value.trim();
  
  if (!nombre) {
    renderizarMedicamentos(medicamentos);
    return;
  }

  try {
    const resultado = await APIClient.get(`/medicamentos?nombre=${nombre}`);
    renderizarMedicamentos(resultado.datos);
  } catch (error) {
    mostrarAlerta('Error al buscar medicamentos', 'danger');
  }
}

async function guardarMedicamento() {
  const id = document.getElementById('medicamentoId').value;
  const datos = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    precio: parseFloat(document.getElementById('precio').value),
    cantidad: parseInt(document.getElementById('cantidad').value)
  };

  if (!datos.nombre || !datos.precio || datos.cantidad === undefined) {
    mostrarAlerta('Complete los campos requeridos', 'warning');
    return;
  }

  try {
    if (id) {
      await APIClient.put(`/medicamentos/${id}`, datos);
      mostrarAlerta('Medicamento actualizado correctamente', 'success');
    } else {
      await APIClient.post('/medicamentos', datos);
      mostrarAlerta('Medicamento creado correctamente', 'success');
    }

    bootstrap.Modal.getInstance(document.getElementById('medicamentoModal')).hide();
    await cargarMedicamentos();
  } catch (error) {
    mostrarAlerta(error.message, 'danger');
  }
}

function editarMedicamento(id) {
  const med = medicamentos.find(m => m.id === id);
  if (med) {
    medicamentoActual = med;
    document.getElementById('medicamentoId').value = med.id;
    document.getElementById('nombre').value = med.nombre;
    document.getElementById('descripcion').value = med.descripcion || '';
    document.getElementById('precio').value = med.precio;
    document.getElementById('cantidad').value = med.cantidad;
    document.getElementById('modalTitle').textContent = 'Editar Medicamento';

    const modal = new bootstrap.Modal(document.getElementById('medicamentoModal'));
    modal.show();
  }
}

async function eliminarMedicamento(id) {
  if (!confirm('¿Está seguro de eliminar este medicamento?')) return;

  try {
    await APIClient.delete(`/medicamentos/${id}`);
    mostrarAlerta('Medicamento eliminado correctamente', 'success');
    await cargarMedicamentos();
  } catch (error) {
    mostrarAlerta(error.message, 'danger');
  }
}

function resetForm() {
  document.getElementById('medicamentoForm').reset();
  document.getElementById('medicamentoId').value = '';
  document.getElementById('modalTitle').textContent = 'Nuevo Medicamento';
  medicamentoActual = null;
}
