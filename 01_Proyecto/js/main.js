// Abrir y cerrar modales
function abrirModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add('flex');
}

function cerrarModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.getElementById(id).classList.remove('flex');
}

// Botones
document.getElementById('btn-carrito').addEventListener('click', () => abrirModal('modal-carrito'));
document.getElementById('btn-usuario').addEventListener('click', () => abrirModal('modal-login'));

// Producto de ejemplo
const catalogo = document.getElementById('catalogo');

const productoDummy = {
    id: 1,
    nombre: "Guitarra Acústica",
    precio: 500,
    imagen: "assets/guitarra.jpg",
    descripcion: "Guitarra acústica de alta calidad, ideal para principiantes y profesionales.",
    categoria: "Instrumentos de cuerda",
    marca: "Stratocaster",
    stock: 10
};

// Función para mostrar modal de detalles
function mostrarDetalle(producto) {
    const modal = document.getElementById('modal-detalle');
    const contenido = document.getElementById('contenido-detalle');
    contenido.innerHTML = `
        <img src="${producto.imagen}" class="mx-auto mb-2" alt="${producto.nombre}" />
        <h3 class="font-bold text-lg mb-1">${producto.nombre}</h3>
        <p class="mb-1"><strong>Precio:</strong> $${producto.precio}</p>
        <p class="mb-1"><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p class="mb-1"><strong>Categoría:</strong> ${producto.categoria}</p>
        <p class="mb-1"><strong>Marca:</strong> ${producto.marca}</p>
        <p class="mb-1"><strong>Stock:</strong> ${producto.stock}</p>
    `;
    abrirModal('modal-detalle');
}

// Crear carrito
let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarritoUI();
}

// Mostrar el carrito
function actualizarCarritoUI() {
    const contenido = document.getElementById('contenido-carrito');
    if (carrito.length === 0) {
        contenido.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    contenido.innerHTML = "";
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = "mb-2 border-b pb-1";
        div.innerHTML = `
            <p><strong>${item.nombre}</strong> x ${item.cantidad}</p>
            <p>Precio: $${item.precio * item.cantidad}</p>
        `;
        contenido.appendChild(div);
    });
}

// Crear tarjeta de producto 
const productoCard = document.createElement('div');
productoCard.className = 'bg-white p-4 rounded shadow text-center';
productoCard.innerHTML = `
    <img src="${productoDummy.imagen}" class="mx-auto mb-2" alt="${productoDummy.nombre}" />
    <h3 class="font-bold">${productoDummy.nombre}</h3>
    <p>$${productoDummy.precio}</p>
    <button class="bg-blue-500 text-white px-3 py-1 rounded mt-2" onclick="mostrarDetalle(productoDummy)">Detalles</button>
    <button class="bg-green-500 text-white px-3 py-1 rounded mt-2" onclick="agregarAlCarrito(productoDummy)">Comprar</button>
`;
catalogo.appendChild(productoCard);

