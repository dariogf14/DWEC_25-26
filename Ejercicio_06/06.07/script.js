const tabla = document.getElementById("tabla");

tabla.addEventListener("dblclick", (e) => {
    const celda = e.target;
    if (celda.tagName.toLowerCase() !== "td") return;
    const valorActual = celda.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = valorActual;
    celda.textContent = "";
    celda.appendChild(input);
    input.focus();
    input.addEventListener("blur", () => {
        celda.textContent = input.value;
    });
});
