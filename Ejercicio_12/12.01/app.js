const contenedor = document.getElementById("contenedor");
const mensaje = document.getElementById("mensaje");
const selectCategorias = document.getElementById("categorias");
const btnAsc = document.getElementById("ordenAsc");
const btnDesc = document.getElementById("ordenDesc");

let productos = [];
let productosMostrados = [];

document.addEventListener("DOMContentLoaded", cargarProductos);

async function cargarProductos() {
    try {
        mensaje.textContent = "Cargando...";

        const respuesta = await fetch("./data/productos.json");
        productos = await respuesta.json();
        productosMostrados = [...productos];

        mensaje.textContent = "";

        mostrarProductos(productosMostrados);
        cargarCategorias(productos);

    } catch (error) {
        mensaje.textContent = "Error al cargar los productos.";
        console.error(error);
    }
}

function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("producto");

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p><strong>Precio:</strong> $${prod.precio}</p>
            <p><strong>Stock:</strong> ${prod.stock}</p>
            <p><strong>Categoría:</strong> ${prod.categoria}</p>
        `;

        contenedor.appendChild(card);
    });
}

function cargarCategorias(productos) {
    const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];

    categorias.forEach(cat => {
        const opcion = document.createElement("option");
        opcion.value = cat;
        opcion.textContent = cat;
        selectCategorias.appendChild(opcion);
    });

    selectCategorias.addEventListener("change", filtrarCategoria);
}

function filtrarCategoria() {
    const seleccion = selectCategorias.value;

    if (seleccion === "Todas") {
        productosMostrados = [...productos];
    } else {
        productosMostrados = productos.filter(p => p.categoria === seleccion);
    }

    mostrarProductos(productosMostrados);
}

btnAsc.addEventListener("click", () => {
    productosMostrados.sort((a, b) => a.precio - b.precio);
    mostrarProductos(productosMostrados);
});

btnDesc.addEventListener("click", () => {
    productosMostrados.sort((a, b) => b.precio - a.precio);
    mostrarProductos(productosMostrados);
});