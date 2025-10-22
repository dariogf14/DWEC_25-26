const carrito = [];
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const botones = document.querySelectorAll(".addBtn");

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const productoDiv = btn.parentElement;
        const nombre = productoDiv.querySelector(".nombre").textContent;
        const precioTexto = productoDiv.querySelector(".precio").textContent;
        const precio = parseFloat(precioTexto.replace("€", "").trim());

        const productoExistente = carrito.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }

        renderizarCarrito();
    });
});

function renderizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
        const li = document.createElement("li");
-        li.textContent = `${item.nombre} (x${item.cantidad}) - ${item.precio * item.cantidad} €`;
        listaCarrito.appendChild(li);
    });
    calcularTotal();
}

function calcularTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalSpan.textContent = total.toFixed(2) + " €";
}