const checkbox = document.getElementById("terminos");
const boton = document.getElementById("enviarBtn");

checkbox.addEventListener("change", () => {
    boton.disabled = !checkbox.checked;
});