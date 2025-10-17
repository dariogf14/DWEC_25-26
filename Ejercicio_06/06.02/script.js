const form = document.getElementById("form");
const tablaBody = document.getElementById("tablaBody");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fila = document.createElement("tr");
    const celdaNombre = document.createElement("td");
    const celdaApellido = document.createElement("td");
    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    tablaBody.appendChild(fila);
    form.reset();
});