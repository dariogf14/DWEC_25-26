const productosContainer = document.getElementById('productos');
const mensaje = document.getElementById('mensaje');
const categoriaSelect = document.getElementById('categoriaSelect');
const ordenAsc = document.getElementById('ordenAsc');
const ordenDesc = document.getElementById('ordenDesc');
const temaClaro = document.getElementById('temaClaro');
const temaOscuro = document.getElementById('temaOscuro');

let productos = [];
let productosMostrados = [];

document.addEventListener('DOMContentLoaded', () => {
  aplicarTemaGuardado();
  cargarProductos();
});

temaClaro.addEventListener('click', () => cambiarTema('claro'));
temaOscuro.addEventListener('click', () => cambiarTema('oscuro'));

function cambiarTema(tema) {
  sessionStorage.setItem('tema', tema);
  aplicarTema(tema);
}

function aplicarTemaGuardado() {
  const temaGuardado = sessionStorage.getItem('tema') || 'claro';
  aplicarTema(temaGuardado);
}

function aplicarTema(tema) {
  if (tema === 'oscuro') {
    document.body.classList.add('tema-oscuro');
  } else {
    document.body.classList.remove('tema-oscuro');
  }
}

async function cargarProductos() {
  try {
    mensaje.textContent = 'Cargando...';

    const respuesta = await fetch('./data/productos.json');

    if (!respuesta.ok) {
      throw new Error('No se pudo cargar productos.json');
    }

    productos = await respuesta.json();
    productosMostrados = [...productos];

    cargarCategorias(productos);
    mostrarProductos(productosMostrados);
    mensaje.classList.add('hidden');
  } catch (error) {
    mensaje.textContent = 'Error al cargar los productos.';
    mensaje.classList.add('error');
    console.error(error);
  }
}

function cargarCategorias(listaProductos) {
  const categorias = [...new Set(listaProductos.map(producto => producto.categoria))];

  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    categoriaSelect.appendChild(option);
  });
}

function mostrarProductos(listaProductos) {
  productosContainer.innerHTML = '';

  listaProductos.forEach(producto => {
    const card = document.createElement('article');
    card.className = 'product-card';

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p class="price">${producto.precio.toFixed(2)} €</p>
      <p>Stock disponible: ${producto.stock}</p>
      <p>Categoría: ${producto.categoria}</p>
      <p>SKU: ${producto.sku}</p>
    `;

    productosContainer.appendChild(card);
  });
}

categoriaSelect.addEventListener('change', () => {
  const categoria = categoriaSelect.value;

  if (categoria === 'Todas') {
    productosMostrados = [...productos];
  } else {
    productosMostrados = productos.filter(producto => producto.categoria === categoria);
  }

  mostrarProductos(productosMostrados);
});

ordenAsc.addEventListener('click', () => {
  productosMostrados.sort((a, b) => a.precio - b.precio);
  mostrarProductos(productosMostrados);
});

ordenDesc.addEventListener('click', () => {
  productosMostrados.sort((a, b) => b.precio - a.precio);
  mostrarProductos(productosMostrados);
});
