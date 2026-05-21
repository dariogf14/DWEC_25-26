const DB_NAME = 'tiendaDB';
const DB_VERSION = 2;
const STORE_PRODUCTOS = 'productos';
const STORE_CARRITO = 'carrito';

const productosContainer = document.getElementById('productos');
const mensaje = document.getElementById('mensaje');
const categoriaSelect = document.getElementById('categoriaSelect');
const ordenAsc = document.getElementById('ordenAsc');
const ordenDesc = document.getElementById('ordenDesc');
const forzarActualizacion = document.getElementById('forzarActualizacion');
const carritoLista = document.getElementById('carritoLista');
const totalCarrito = document.getElementById('totalCarrito');

let db = null;
let productos = [];
let productosMostrados = [];

document.addEventListener('DOMContentLoaded', iniciarApp);

async function iniciarApp() {
  try {
    mostrarMensaje('Abriendo IndexedDB...');
    db = await abrirBaseDeDatos();

    productos = await obtenerProductosIndexedDB();

    if (productos.length === 0) {
      mostrarMensaje('Cargando productos desde JSON...');
      productos = await cargarProductosDesdeJSON();
      await guardarProductosIndexedDB(productos);
    }

    productosMostrados = [...productos];

    reiniciarCategorias();
    cargarCategorias(productos);
    mostrarProductos(productosMostrados);
    await mostrarCarrito();

    mensaje.classList.add('hidden');
  } catch (error) {
    mensaje.textContent = 'Error al iniciar la aplicación.';
    mensaje.classList.add('error');
    console.error(error);
  }
}

function abrirBaseDeDatos() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const database = event.target.result;

      if (!database.objectStoreNames.contains(STORE_PRODUCTOS)) {
        database.createObjectStore(STORE_PRODUCTOS, { keyPath: 'id' });
      }

      if (!database.objectStoreNames.contains(STORE_CARRITO)) {
        database.createObjectStore(STORE_CARRITO, { keyPath: 'productoId' });
      }
    };

    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}

function obtenerProductosIndexedDB() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PRODUCTOS, 'readonly');
    const store = transaction.objectStore(STORE_PRODUCTOS);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event.target.error);
  });
}

async function cargarProductosDesdeJSON() {
  const respuesta = await fetch('./data/productos.json');

  if (!respuesta.ok) {
    throw new Error('No se pudo cargar productos.json');
  }

  return await respuesta.json();
}

function guardarProductosIndexedDB(listaProductos) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PRODUCTOS, 'readwrite');
    const store = transaction.objectStore(STORE_PRODUCTOS);

    listaProductos.forEach(producto => store.put(producto));

    transaction.oncomplete = () => resolve();
    transaction.onerror = event => reject(event.target.error);
  });
}

function borrarProductosIndexedDB() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PRODUCTOS, 'readwrite');
    const store = transaction.objectStore(STORE_PRODUCTOS);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = event => reject(event.target.error);
  });
}

function obtenerCarrito() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CARRITO, 'readonly');
    const store = transaction.objectStore(STORE_CARRITO);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event.target.error);
  });
}

function obtenerItemCarrito(productoId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CARRITO, 'readonly');
    const store = transaction.objectStore(STORE_CARRITO);
    const request = store.get(productoId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = event => reject(event.target.error);
  });
}

async function anadirAlCarrito(productoId) {
  const item = await obtenerItemCarrito(productoId);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CARRITO, 'readwrite');
    const store = transaction.objectStore(STORE_CARRITO);

    if (item) {
      item.cantidad++;
      store.put(item);
    } else {
      store.add({ productoId, cantidad: 1 });
    }

    transaction.oncomplete = () => resolve();
    transaction.onerror = event => reject(event.target.error);
  });
}

function actualizarCantidad(productoId, nuevaCantidad) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CARRITO, 'readwrite');
    const store = transaction.objectStore(STORE_CARRITO);

    if (nuevaCantidad <= 0) {
      store.delete(productoId);
    } else {
      store.put({ productoId, cantidad: nuevaCantidad });
    }

    transaction.oncomplete = () => resolve();
    transaction.onerror = event => reject(event.target.error);
  });
}

function eliminarDelCarrito(productoId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_CARRITO, 'readwrite');
    const store = transaction.objectStore(STORE_CARRITO);
    store.delete(productoId);

    transaction.oncomplete = () => resolve();
    transaction.onerror = event => reject(event.target.error);
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

async function mostrarCarrito() {
  const carrito = await obtenerCarrito();
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
        <p>${producto.precio.toFixed(2)} € unidad</p>
      </div>
      <div class="cart-actions">
        <button class="btn-restar" data-id="${producto.id}" data-cantidad="${item.cantidad}">-</button>
        <span>${item.cantidad}</span>
        <button class="btn-sumar" data-id="${producto.id}" data-cantidad="${item.cantidad}">+</button>
        <button class="btn-eliminar danger" data-id="${producto.id}">x</button>
      </div>
      <div><strong>${subtotal.toFixed(2)} €</strong></div>
    `;

    carritoLista.appendChild(div);
  });

  totalCarrito.textContent = `${total.toFixed(2)} €`;
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

function reiniciarCategorias() {
  categoriaSelect.innerHTML = '<option value="Todas">Todas</option>';
}

function mostrarMensaje(texto) {
  mensaje.classList.remove('hidden', 'error');
  mensaje.textContent = texto;
}

productosContainer.addEventListener('click', async event => {
  if (event.target.classList.contains('btn-carrito')) {
    const productoId = event.target.dataset.id;
    await anadirAlCarrito(productoId);
    await mostrarCarrito();
  }
});

carritoLista.addEventListener('click', async event => {
  const productoId = event.target.dataset.id;

  if (!productoId) {
    return;
  }

  if (event.target.classList.contains('btn-sumar')) {
    const cantidad = Number(event.target.dataset.cantidad);
    await actualizarCantidad(productoId, cantidad + 1);
  }

  if (event.target.classList.contains('btn-restar')) {
    const cantidad = Number(event.target.dataset.cantidad);
    await actualizarCantidad(productoId, cantidad - 1);
  }

  if (event.target.classList.contains('btn-eliminar')) {
    await eliminarDelCarrito(productoId);
  }

  await mostrarCarrito();
});

forzarActualizacion.addEventListener('click', async () => {
  try {
    mostrarMensaje('Actualizando catálogo desde JSON...');

    await borrarProductosIndexedDB();
    productos = await cargarProductosDesdeJSON();
    await guardarProductosIndexedDB(productos);

    productosMostrados = [...productos];
    reiniciarCategorias();
    cargarCategorias(productos);
    mostrarProductos(productosMostrados);
    await mostrarCarrito();

    mostrarMensaje('Catálogo actualizado correctamente.');
    setTimeout(() => mensaje.classList.add('hidden'), 1500);
  } catch (error) {
    mensaje.textContent = 'Error al actualizar el catálogo.';
    mensaje.classList.add('error');
    console.error(error);
  }
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
