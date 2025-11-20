const estadoDiv = document.getElementById('estado');
const panelPedidosDiv = document.getElementById('panel-pedidos');

async function cargarPanel() {
  estadoDiv.textContent = 'Cargando datos del panel...';

  try {
    const [pedidosRes, detallesRes, productosRes] = await Promise.all([
      fetch('./data/pedidos.json'),
      fetch('./data/detalles_pedido.json'),
      fetch('./data/productos.json')
    ]);

    if (!pedidosRes.ok || !detallesRes.ok || !productosRes.ok) {
      throw new Error('Error al cargar los datos');
    }

    const [pedidos, detalles, productos] = await Promise.all([
      pedidosRes.json(),
      detallesRes.json(),
      productosRes.json()
    ]);

    const pedidosEnriquecidos = combinarDatos(pedidos, detalles, productos);

    mostrarPanel(pedidosEnriquecidos);
    estadoDiv.textContent = '';

  } catch (error) {
    estadoDiv.textContent = 'Error cargando datos: ' + error.message;
    console.error(error);
  }
}

function combinarDatos(pedidos, detalles, productos) {
  return pedidos.map(pedido => {
    const detallesPedido = detalles
      .filter(d => d.pedidoId === pedido.id)
      .map(d => {
        const producto = productos.find(prod => prod.id === d.productoId);
        return {
          cantidad: d.cantidad,
          precioUnitario: d.precioUnitario,
          nombreProducto: producto ? producto.nombre : 'Producto desconocido'
        };
      });

    const totalPedido = detallesPedido.reduce(
      (sum, d) => sum + d.cantidad * d.precioUnitario,
      0
    );

    return { ...pedido, detalles: detallesPedido, totalPedido };
  });
}

function mostrarPanel(pedidos) {
  panelPedidosDiv.innerHTML = '';

  pedidos.forEach(pedido => {
    const card = document.createElement('div');
    card.classList.add('card');

    const totalFormateado = pedido.totalPedido.toFixed(2) + ' €';

    let html = `
      <h2>Pedido #${pedido.id} - ${pedido.fecha}</h2>
      <p><strong>Estado:</strong> ${pedido.estado}</p>
      <p><strong>Total:</strong> ${totalFormateado}</p>
      <ul>
    `;

    pedido.detalles.forEach(det => {
      html += `<li>${det.cantidad} x ${det.nombreProducto} - ${det.precioUnitario.toFixed(2)} €</li>`;
    });

    html += '</ul>';

    card.innerHTML = html;
    panelPedidosDiv.appendChild(card);
  });
}

cargarPanel();