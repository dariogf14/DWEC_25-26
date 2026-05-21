const productosContainer = document.getElementById('productos');
const mensaje = document.getElementById('mensaje');
const categoriaSelect = document.getElementById('categoriaSelect');
const ordenAsc = document.getElementById('ordenAsc');
const ordenDesc = document.getElementById('ordenDesc');
const carritoLista = document.getElementById('carritoLista');
const totalCarrito = document.getElementById('totalCarrito');
const vaciarCarrito = document.getElementById('vaciarCarrito');

let productos = [];
let productosMostrados = [];

document.addEventListener('DOMContentLoaded', cargarProductos);

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
    mostrarCarrito();

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
      <button data-id="${producto.id}" class="btn-carrito">Añadir al carrito</button>
    `;

    productosContainer.appendChild(card);
  });
}

productosContainer.addEventListener('click', event => {
  if (event.target.classList.contains('btn-carrito')) {
    const productoId = event.target.dataset.id;
    anadirAlCarrito(productoId);
  }
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function anadirAlCarrito(productoId) {
  const carrito = obtenerCarrito();
  const item = carrito.find(producto => producto.productoId === productoId);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ productoId, cantidad: 1 });
  }

  guardarCarrito(carrito);
  mostrarCarrito();
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  carritoLista.innerHTML = '';

  if (carrito.length === 0) {
    carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
    totalCarrito.textContent = '0.00 €';
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.productoId);

    if (!producto) {
      return;
    }

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <div>
        <strong>${producto.nombre}</strong>
        <p>Cantidad: ${item.cantidad}</p>
      </div>
      <div>${subtotal.toFixed(2)} €</div>
    `;

    carritoLista.appendChild(div);
  });

  totalCarrito.textContent = `${total.toFixed(2)} €`;
}

vaciarCarrito.addEventListener('click', () => {
  localStorage.removeItem('carrito');
  mostrarCarrito();
});

categoriaSelect.addEventListener('change', () => {
  const categoria = categoriaSelect.value;

  productosMostrados = categoria === 'Todas'
    ? [...productos]
    : productos.filter(producto => producto.categoria === categoria);

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
