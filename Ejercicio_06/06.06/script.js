const arrastrable = document.getElementById("arrastrable");
const contenedor = document.getElementById("contenedor");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

arrastrable.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    arrastrable.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = contenedor.getBoundingClientRect();
    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;
    x = Math.max(0, Math.min(x, rect.width - arrastrable.offsetWidth));
    y = Math.max(0, Math.min(y, rect.height - arrastrable.offsetHeight));
    arrastrable.style.left = x + "px";
    arrastrable.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    arrastrable.style.cursor = "grab";
});