const grid = document.getElementById("grid");
let isDrawing = false;

for (let i = 0; i < 1600; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
}

grid.addEventListener("mousedown", () => {
    isDrawing = true;
});

grid.addEventListener("mouseup", () => {
    isDrawing = false;
});

grid.addEventListener("mouseover", (e) => {
    if (isDrawing && e.target.tagName.toLowerCase() === "div") {
        e.target.style.backgroundColor = "black";
    }
});

grid.addEventListener("mousedown", (e) => {
    if (e.target.tagName.toLowerCase() === "div") {
        e.target.style.backgroundColor = "black";
    }
});