/**
 * Dashboard - Carga datos iniciales
 */
document.addEventListener('DOMContentLoaded', async () => {
  await cargarDatos();
});

async function cargarDatos() {
  try {
    // Cargar medicamentos
    const medicamentos = await APIClient.get('/medicamentos');
    document.getElementById('totalMedicamentos').textContent = medicamentos.datos.length;

    // Cargar clientes
    const clientes = await APIClient.get('/clientes');
    document.getElementById('totalClientes').textContent = clientes.datos.length;

    // Cargar medicamentos con stock bajo
    const stockBajo = await APIClient.get('/medicamentos/stock-bajo');
    document.getElementById('stockBajo').textContent = stockBajo.datos.length;

    // Renderizar medicamentos con stock bajo
    renderizarStockBajo(stockBajo.datos);

    // Cargar ventas
    const ventas = await APIClient.get('/ventas');
    const totalVentas = ventas.datos.reduce((sum, venta) => sum + parseFloat(venta.total), 0);
    document.getElementById('totalVentas').textContent = formatearMoneda(totalVentas);

    // Renderizar últimas ventas
    renderizarVentas(ventas.datos.slice(0, 10));
  } catch (error) {
    console.error('Error cargando datos:', error);
    mostrarAlerta('Error al cargar datos del dashboard', 'danger');
  }
}

function renderizarStockBajo(medicamentos) {
  const tbody = document.getElementById('stockBajoBody');
  
  if (medicamentos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Sin medicamentos con stock bajo</td></tr>';
    return;
  }

  tbody.innerHTML = medicamentos.map(med => {
    const estado = obtenerEstadoStock(med.cantidad, med.alerta_stock);
    return `
      <tr>
        <td><strong>${med.nombre}</strong></td>
        <td><span class="badge badge-warning">${med.cantidad} unidades</span></td>
        <td>${formatearMoneda(med.precio)}</td>
        <td><span class="badge ${estado.clase}">${estado.texto}</span></td>
      </tr>
    `;
  }).join('');
}

function renderizarVentas(ventas) {
  const tbody = document.getElementById('ventasBody');
  
  if (ventas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Sin ventas registradas</td></tr>';
    return;
  }

  tbody.innerHTML = ventas.map(venta => `
    <tr>
      <td>#${venta.id}</td>
      <td>${venta.cliente_nombre}</td>
      <td>${formatearFecha(venta.fecha)}</td>
      <td>${formatearMoneda(venta.total)}</td>
      <td>${formatearMoneda(venta.descuento_aplicado)}</td>
    </tr>
  `).join('');
}
