const contenedor = document.getElementById("contenedorProductos");
const inputBusqueda = document.getElementById("busqueda");
const selectCategoria = document.getElementById("categoria");
const rangoPrecio = document.getElementById("precioMax");
const valorPrecio = document.getElementById("precioValor");
const radiosOrden = document.querySelectorAll('input[name="orden"]');

// 1
function cargarCategorias() {
  const categoriasUnicas = ["Todas", ...new Set(productos.map(p => p.categoria))];
  selectCategoria.innerHTML = categoriasUnicas
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");
}

// 2
function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted">No se encontraron productos</p>`;
    return;
  }

  lista.forEach(p => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-md-3");
    tarjeta.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.categoria}</p>
          <p class="fw-bold">${p.precio} €</p>
        </div>
      </div>`;
    contenedor.appendChild(tarjeta);
  });
}

// 3
function filtrarYOrdenar() {
  let lista = [...productos];

  const texto = inputBusqueda.value.toLowerCase();
  const categoria = selectCategoria.value;
  const precioMax = parseFloat(rangoPrecio.value);
  const orden = document.querySelector('input[name="orden"]:checked')?.value;

  // Nombre
  if (texto) {
    lista = lista.filter(p => p.nombre.toLowerCase().includes(texto));
  }

  // Categoría
  if (categoria !== "Todas") {
    lista = lista.filter(p => p.categoria === categoria);
  }

  // Precio máx
  lista = lista.filter(p => p.precio <= precioMax);

  // Ordenar
  if (orden === "asc") lista.sort((a, b) => a.precio - b.precio);
  if (orden === "desc") lista.sort((a, b) => b.precio - a.precio);
  if (orden === "az") lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Resultado
  mostrarProductos(lista);
}

// 4
window.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  mostrarProductos(productos);
  valorPrecio.textContent = rangoPrecio.value;
});

// 5
inputBusqueda.addEventListener("input", filtrarYOrdenar);
selectCategoria.addEventListener("change", filtrarYOrdenar);
rangoPrecio.addEventListener("input", () => {
  valorPrecio.textContent = rangoPrecio.value;
  filtrarYOrdenar();
});
radiosOrden.forEach(r => r.addEventListener("change", filtrarYOrdenar));