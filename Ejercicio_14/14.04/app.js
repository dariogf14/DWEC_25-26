const DB_NAME = 'tiendaDB';
const DB_VERSION = 1;
const STORE_PRODUCTOS = 'productos';

const productosContainer = document.getElementById('productos');
const mensaje = document.getElementById('mensaje');
const categoriaSelect = document.getElementById('categoriaSelect');
const ordenAsc = document.getElementById('ordenAsc');
const ordenDesc = document.getElementById('ordenDesc');
const forzarActualizacion = document.getElementById('forzarActualizacion');

let db = null;
let productos = [];
let productosMostrados = [];

document.addEventListener('DOMContentLoaded', iniciarApp);

async function iniciarApp() {
  try {
    mostrarMensaje('Abriendo IndexedDB...');
    db = await abrirBaseDeDatos();

    productos = await obtenerProductosIndexedDB();

    if (productos.length > 0) {
      mostrarMensaje('Productos cargados desde IndexedDB.');
    } else {
      mostrarMensaje('No hay productos en IndexedDB. Cargando desde JSON...');
      productos = await cargarProductosDesdeJSON();
      await guardarProductosIndexedDB(productos);
    }

    productosMostrados = [...productos];
    reiniciarCategorias();
    cargarCategorias(productos);
    mostrarProductos(productosMostrados);

    setTimeout(() => mensaje.classList.add('hidden'), 1200);
  } catch (error) {
    mensaje.textContent = 'Error al cargar el catálogo.';
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
