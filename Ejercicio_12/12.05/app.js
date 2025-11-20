let usuarios = [];
let productos = [];
let pedidos = [];
let detalles = [];

const estadoDiv = document.getElementById('estado');
const selectUsuario = document.getElementById('select-usuario');
const infoUsuarioDiv = document.getElementById('info-usuario');
const pedidosUsuarioDiv = document.getElementById('pedidos-usuario');
const resumenUsuarioDiv = document.getElementById('resumen-usuario');

async function cargarDatosIniciales() {
  estadoDiv.textContent = 'Cargando datos maestros...';

  try {
    const [usuariosRes, productosRes, pedidosRes, detallesRes] = await Promise.all([
      fetch('./data/usuarios.json'),
      fetch('./data/productos.json'),
      fetch('./data/pedidos.json'),
      fetch('./data/detalles_pedido.json')
    ]);

    if (!usuariosRes.ok || !productosRes.ok || !pedidosRes.ok || !detallesRes.ok) {
      throw new Error('Error al cargar datos');
    }

    [usuarios, productos, pedidos, detalles] = await Promise.all([
      usuariosRes.json(),
      productosRes.json(),
      pedidosRes.json(),
      detallesRes.json()
    ]);

    inicializarDashboard();
    estadoDiv.textContent = '';
  } catch (error) {
    estadoDiv.textContent = 'Error cargando datos: ' + error.message;
    console.error(error);
  }
}

function inicializarDashboard() {
  selectUsuario.disabled = false;
  usuarios.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = u.nombre;
    selectUsuario.appendChild(option);
  });

  selectUsuario.addEventListener('change', () => {
    const usuarioId = selectUsuario.value;
    if (usuarioId) {
      mostrarDashboardUsuario(usuarioId);
    } else {
      limpiarDashboard();
    }
  });
}

function mostrarDashboardUsuario(usuarioId) {
  const usuario = usuarios.find(u => u.id == usuarioId);
  if (!usuario) return;

  renderizarInfoUsuario(usuario);

  const pedidosUsuario = pedidos.filter(p => p.usuarioId == usuarioId);
  renderizarPedidosUsuario(pedidosUsuario);

  const gastoTotal = pedidosUsuario.reduce((total, pedido) => {
    const detallesPedido = buscarDetallesDePedido(pedido.id);
    const totalPedido = calcularTotalPedido(detallesPedido);
    return total + totalPedido;
  }, 0);

  renderizarResumenUsuario(gastoTotal);
}

function buscarDetallesDePedido(pedidoId) {
  return detalles.filter(d => d.pedidoId == pedidoId).map(d => {
    const producto = productos.find(p => p.id == d.productoId);
    return {
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      nombreProducto: producto ? producto.nombre : 'Producto desconocido'
    };
  });
}

function calcularTotalPedido(detallesPedido) {
  return detallesPedido.reduce((sum, d) => sum + d.cantidad * d.precioUnitario, 0);
}

function renderizarInfoUsuario(usuario) {
  infoUsuarioDiv.innerHTML = `
    <div class="card">
      <h2>Usuario: ${usuario.nombre}</h2>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Fecha registro:</strong> ${usuario.fechaRegistro}</p>
    </div>
  `;
}

function renderizarPedidosUsuario(pedidosUsuario) {
  pedidosUsuarioDiv.innerHTML = '';
  if (pedidosUsuario.length === 0) {
    pedidosUsuarioDiv.innerHTML = '<p>Este usuario no tiene pedidos.</p>';
    return;
  }

  pedidosUsuario.forEach(pedido => {
    const detallesPedido = buscarDetallesDePedido(pedido.id);
    const totalPedido = calcularTotalPedido(detallesPedido).toFixed(2) + ' €';

    const card = document.createElement('div');
    card.classList.add('card');

    let html = `
      <h2>Pedido #${pedido.id} - ${pedido.fecha}</h2>
      <ul>
    `;

    detallesPedido.forEach(d => {
      html += `<li>${d.cantidad} x ${d.nombreProducto} - ${d.precioUnitario.toFixed(2)} €</li>`;
    });

    html += `</ul>
      <p><strong>Total Pedido:</strong> ${totalPedido}</p>
    `;

    card.innerHTML = html;
    pedidosUsuarioDiv.appendChild(card);
  });
}

function renderizarResumenUsuario(gastoTotal) {
  resumenUsuarioDiv.innerHTML = `
    <div class="card">
      <p><strong>Gasto total acumulado:</strong> ${gastoTotal.toFixed(2)} €</p>
    </div>
  `;
}

function limpiarDashboard() {
  infoUsuarioDiv.innerHTML = '';
  pedidosUsuarioDiv.innerHTML = '';
  resumenUsuarioDiv.innerHTML = '';
}

cargarDatosIniciales();