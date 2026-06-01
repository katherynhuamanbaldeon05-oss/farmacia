/**
 * Gestión de Ventas
 */
let clientesSelect = [];
let medicamentosSelect = [];
let detallesVenta = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarDatos();
  inicializarEventos();
});

async function cargarDatos() {
  try {
    // Cargar clientes
    const resultadoClientes = await APIClient.get('/clientes');
    clientesSelect = resultadoClientes.datos;
    poblarSelectClientes();

    // Cargar medicamentos
    const resultadoMedicamentos = await APIClient.get('/medicamentos');
    medicamentosSelect = resultadoMedicamentos.datos;
    poblarSelectMedicamentos();

    // Cargar ventas
    const resultadoVentas = await APIClient.get('/ventas');
    renderizarVentas(resultadoVentas.datos);
  } catch (error) {
    mostrarAlerta('Error al cargar datos', 'danger');
  }
}

function poblarSelectClientes() {
  const select = document.getElementById('clienteSelect');
  select.innerHTML = '<option value="">-- Seleccionar Cliente --</option>';
  
  clientesSelect.forEach(cliente => {
    const option = document.createElement('option');
    option.value = cliente.id;
    option.textContent = `${cliente.nombre} ${cliente.apellido} (${cliente.dni})`;
    option.dataset.puntos = cliente.puntos;
    select.appendChild(option);
  });

  select.addEventListener('change', actualizarDescuento);
}

function poblarSelectMedicamentos() {
  const selects = document.querySelectorAll('.medicamento-select');
  selects.forEach(select => {
    select.innerHTML = '<option value="">-- Seleccionar --</option>';
    medicamentosSelect.forEach(med => {
      const option = document.createElement('option');
      option.value = med.id;
      option.textContent = `${med.nombre} - ${formatearMoneda(med.precio)} (Stock: ${med.cantidad})`;
      option.dataset.precio = med.precio;
      option.dataset.stock = med.cantidad;
      select.appendChild(option);
    });
  });
}

function inicializarEventos() {
  document.getElementById('btnAgregarMedicamento').addEventListener('click', agregarFilaMedicamento);
  document.getElementById('btnProcesarVenta').addEventListener('click', procesarVenta);

  // Delegación de eventos para detalles
  document.getElementById('detallesContainer').addEventListener('change', (e) => {
    if (e.target.classList.contains('medicamento-select') || e.target.classList.contains('cantidad-input')) {
      actualizarPrecioUnitario(e.target);
      calcularTotal();
    }
  });

  document.getElementById('detallesContainer').addEventListener('click', (e) => {
    if (e.target.closest('.btn-eliminar')) {
      e.target.closest('.detalle-item').remove();
      calcularTotal();
    }
  });
}

function obtenerPorcentajeDescuento(puntos) {
  if (puntos >= 200) {
    return 100;
  } else if (puntos >= 100) {
    return 10;
  } else if (puntos >= 50) {
    return 5;
  } else if (puntos >= 20) {
    return 5;
  }
  return 0;
}

function obtenerHitoPuntos(puntos) {
  if (puntos >= 100) {
    return Math.floor(puntos / 100) * 100;
  }
  return 0;
}

function actualizarDescuento() {
  const select = document.getElementById('clienteSelect');
  const option = select.options[select.selectedIndex];
  const puntos = parseInt(option.dataset.puntos || 0);
  const porcentaje = obtenerPorcentajeDescuento(puntos);
  const hito = obtenerHitoPuntos(puntos);

  const descuentoInfoElement = document.getElementById('descuentoInfo');
  const giftBannerRow = document.getElementById('giftBannerRow');
  const giftBanner = document.getElementById('giftBanner');

  const giftSelectContainer = document.getElementById('giftSelectContainer');

  if (hito > 0) {
    giftBannerRow.classList.remove('d-none');
    giftBanner.textContent = `¡Felicidades has llegado a los ${hito} puntos!`;
  } else {
    giftBannerRow.classList.add('d-none');
  }

  if (puntos >= 200) {
    descuentoInfoElement.textContent = 'Compra gratis';
    giftSelectContainer.classList.remove('d-none');
  } else {
    giftSelectContainer.classList.add('d-none');
    if (puntos >= 100) {
      descuentoInfoElement.textContent = '10% descuento';
    } else if (puntos >= 50) {
      descuentoInfoElement.textContent = '5% descuento';
    } else if (puntos >= 20) {
      descuentoInfoElement.textContent = 'Descuento disponible';
    } else {
      const faltan = 20 - puntos;
      descuentoInfoElement.textContent = `Faltan ${faltan} punto${faltan === 1 ? '' : 's'} para descuento`;
    }
  }

  calcularTotal();
}

function agregarFilaMedicamento() {
  const container = document.getElementById('detallesContainer');
  const filasExistentes = container.querySelectorAll('.detalle-item').length;
  
  if (filasExistentes >= 10) {
    mostrarAlerta('Máximo 10 medicamentos por venta', 'warning');
    return;
  }

  const nuevaFila = document.createElement('div');
  nuevaFila.className = 'detalle-item mb-3';
  nuevaFila.innerHTML = `
    <div class="row">
      <div class="col-md-5">
        <label class="form-label">Medicamento</label>
        <select class="form-select medicamento-select" required>
          <option value="">-- Seleccionar --</option>
          ${medicamentosSelect.map(med => `
            <option value="${med.id}" data-precio="${med.precio}" data-stock="${med.cantidad}">
              ${med.nombre} - ${formatearMoneda(med.precio)}
            </option>
          `).join('')}
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Cantidad</label>
        <input type="number" class="form-control cantidad-input" min="1" required>
      </div>
      <div class="col-md-3">
        <label class="form-label">Precio Unitario</label>
        <input type="number" class="form-control precio-unitario" disabled>
      </div>
      <div class="col-md-1">
        <button type="button" class="btn btn-danger btn-sm mt-4 btn-eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;

  container.appendChild(nuevaFila);
}

function actualizarPrecioUnitario(elemento) {
  const detalle = elemento.closest('.detalle-item');
  const selectMedicamento = detalle.querySelector('.medicamento-select');
  const precioPuntuario = detalle.querySelector('.precio-unitario');

  if (selectMedicamento.value) {
    const opcionSeleccionada = selectMedicamento.options[selectMedicamento.selectedIndex];
    precioPuntuario.value = opcionSeleccionada.dataset.precio;
  }
}

function calcularTotal() {
  let subtotal = 0;
  const detalles = document.querySelectorAll('.detalle-item');

  detalles.forEach(detalle => {
    const cantidad = parseFloat(detalle.querySelector('.cantidad-input').value) || 0;
    const precio = parseFloat(detalle.querySelector('.precio-unitario').value) || 0;
    subtotal += cantidad * precio;
  });

  document.getElementById('subtotal').textContent = subtotal.toFixed(2);

  // Calcular descuento
  const select = document.getElementById('clienteSelect');
  const option = select.options[select.selectedIndex];
  const puntos = parseInt(option.dataset.puntos || 0);
  const porcentajeDescuento = obtenerPorcentajeDescuento(puntos);

  const descuentoAmount = (subtotal * porcentajeDescuento) / 100;
  const total = subtotal - descuentoAmount;

  document.getElementById('descuentoAmount').textContent = descuentoAmount.toFixed(2);
  document.getElementById('totalVenta').textContent = total.toFixed(2);
}

async function procesarVenta() {
  const clienteId = parseInt(document.getElementById('clienteSelect').value);
  
  if (!clienteId) {
    mostrarAlerta('Seleccione un cliente', 'warning');
    return;
  }

  const detalles = [];
  document.querySelectorAll('.detalle-item').forEach(detalle => {
    const medicamentoId = parseInt(detalle.querySelector('.medicamento-select').value);
    const cantidad = parseInt(detalle.querySelector('.cantidad-input').value);

    if (medicamentoId && cantidad > 0) {
      detalles.push({
        medicamentoId,
        cantidad
      });
    }
  });

  if (detalles.length === 0) {
    mostrarAlerta('Agregue al menos un medicamento', 'warning');
    return;
  }

  try {
    const resultado = await APIClient.post('/ventas', {
      clienteId,
      detalles
    });

    const giftSelect = document.getElementById('giftSelect');
    const regalo = giftSelect ? giftSelect.value : '';
    let mensaje = `¡Venta procesada exitosamente! Puntos ganados: ${resultado.datos.puntosGanados}`;
    if (resultado.datos.descuentoAplicado > 0 && resultado.datos.descuentoAplicado >= resultado.datos.totalFinal) {
      mensaje = `¡Venta completamente gratis! Regalo seleccionado: ${regalo || 'No seleccionado'}`;
    }
    mostrarAlerta(mensaje, 'success');
    bootstrap.Modal.getInstance(document.getElementById('ventaModal')).hide();
    resetFormulario();
    await cargarDatos();
  } catch (error) {
    mostrarAlerta(error.message, 'danger');
  }
}

function resetFormulario() {
  const container = document.getElementById('detallesContainer');
  container.innerHTML = `
    <div class="detalle-item mb-3">
      <div class="row">
        <div class="col-md-5">
          <label class="form-label">Medicamento</label>
          <select class="form-select medicamento-select" required>
            <option value="">-- Seleccionar --</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">Cantidad</label>
          <input type="number" class="form-control cantidad-input" min="1" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Precio Unitario</label>
          <input type="number" class="form-control precio-unitario" disabled>
        </div>
        <div class="col-md-1">
          <button type="button" class="btn btn-danger btn-sm mt-4 btn-eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  poblarSelectMedicamentos();
  document.getElementById('clienteSelect').value = '';
  document.getElementById('descuentoInfo').textContent = 'Sin descuento';
  const giftBannerRow = document.getElementById('giftBannerRow');
  giftBannerRow.classList.add('d-none');
  const giftSelectContainer = document.getElementById('giftSelectContainer');
  giftSelectContainer.classList.add('d-none');
  document.getElementById('giftSelect').value = '';
  calcularTotal();
}

function renderizarVentas(ventas) {
  const tbody = document.getElementById('ventasBody');
  
  if (ventas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No hay ventas</td></tr>';
    return;
  }

  tbody.innerHTML = ventas.map(venta => {
    const totalNeto = venta.total - venta.descuento_aplicado;
    return `
      <tr>
        <td><strong>#${venta.id}</strong></td>
        <td>${venta.cliente_nombre}</td>
        <td>${venta.dni}</td>
        <td>${formatearFecha(venta.fecha)}</td>
        <td>${formatearMoneda(venta.total)}</td>
        <td>${formatearMoneda(venta.descuento_aplicado)}</td>
        <td><strong>${formatearMoneda(totalNeto)}</strong></td>
        <td>
          <button class="btn btn-sm btn-info" onclick="verDetallesVenta(${venta.id})">
            <i class="fas fa-eye"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

async function verDetallesVenta(ventaId) {
  try {
    const resultado = await APIClient.get(`/ventas/${ventaId}`);
    alert('Detalles de venta:\n' + JSON.stringify(resultado.datos, null, 2));
  } catch (error) {
    mostrarAlerta('Error al cargar detalles', 'danger');
  }
}
