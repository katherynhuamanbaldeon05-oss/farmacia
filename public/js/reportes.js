/**
 * Reportes
 */
document.addEventListener('DOMContentLoaded', async () => {
  await cargarReportes();
});

async function cargarReportes() {
  try {
    // Cargar reporte de stock
    const resultadoMedicamentos = await APIClient.get('/medicamentos');
    renderizarReporteStock(resultadoMedicamentos.datos);

    // Cargar reporte de clientes
    const resultadoClientes = await APIClient.get('/clientes');
    renderizarReporteClientes(resultadoClientes.datos);

    // Cargar reporte de ventas
    const resultadoVentas = await APIClient.get('/ventas');
    renderizarReporteVentas(resultadoVentas.datos);
  } catch (error) {
    mostrarAlerta('Error al cargar reportes', 'danger');
  }
}

function renderizarReporteStock(medicamentos) {
  const tbody = document.getElementById('stockReporteBody');
  
  if (medicamentos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay medicamentos</td></tr>';
    return;
  }

  const medicamentosOrdenados = medicamentos.sort((a, b) => a.cantidad - b.cantidad);

  tbody.innerHTML = medicamentosOrdenados.map(med => {
    const estado = obtenerEstadoStock(med.cantidad, med.alerta_stock);
    const porcentajeStock = ((med.cantidad / (med.alerta_stock * 3)) * 100).toFixed(0);
    
    return `
      <tr>
        <td>${med.nombre}</td>
        <td>
          <div class="progress" style="height: 20px;">
            <div 
              class="progress-bar ${med.cantidad < med.alerta_stock ? 'bg-danger' : 'bg-success'}" 
              role="progressbar" 
              style="width: ${Math.min(porcentajeStock, 100)}%">
              ${med.cantidad}
            </div>
          </div>
        </td>
        <td><span class="badge bg-info">${med.alerta_stock}</span></td>
        <td>${formatearMoneda(med.precio)}</td>
        <td><span class="badge ${estado.clase}">${estado.texto}</span></td>
      </tr>
    `;
  }).join('');
}

function renderizarReporteClientes(clientes) {
  const tbody = document.getElementById('clientesReporteBody');
  
  if (clientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay clientes</td></tr>';
    return;
  }

  const clientesOrdenados = clientes.sort((a, b) => b.puntos - a.puntos);

  tbody.innerHTML = clientesOrdenados.map(cliente => {
    const descuento = obtenerNivelDescuento(cliente.puntos);
    let badgeClase = 'bg-secondary';
    let nivel = 'Sin Beneficio';

    if (cliente.puntos >= 100) {
      badgeClase = 'bg-danger';
      nivel = 'Platinum';
    } else if (cliente.puntos >= 50) {
      badgeClase = 'bg-warning text-dark';
      nivel = 'Gold';
    }

    return `
      <tr>
        <td><strong>${cliente.nombre} ${cliente.apellido}</strong></td>
        <td>${cliente.dni}</td>
        <td>
          <span class="badge ${badgeClase}">${cliente.puntos} pts</span>
        </td>
        <td><span class="badge bg-info">${nivel}</span></td>
        <td><small>${descuento}</small></td>
      </tr>
    `;
  }).join('');
}

function renderizarReporteVentas(ventas) {
  const tbody = document.getElementById('ventasReporteBody');
  
  if (ventas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No hay ventas</td></tr>';
    return;
  }

  const ventasOrdenadas = ventas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  tbody.innerHTML = ventasOrdenadas.map(venta => {
    const subtotal = parseFloat(venta.total) + parseFloat(venta.descuento_aplicado);
    const total = parseFloat(venta.total);
    
    return `
      <tr>
        <td><strong>#${venta.id}</strong></td>
        <td>${venta.cliente_nombre}</td>
        <td>${formatearFecha(venta.fecha)}</td>
        <td><span class="badge bg-info">1</span></td>
        <td>${formatearMoneda(subtotal)}</td>
        <td>
          ${venta.descuento_aplicado > 0 
            ? `<span class="badge bg-success">${formatearMoneda(venta.descuento_aplicado)}</span>` 
            : '<span class="text-muted">-</span>'}
        </td>
        <td><strong>${formatearMoneda(total)}</strong></td>
      </tr>
    `;
  }).join('');
}
