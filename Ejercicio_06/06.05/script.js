const input = document.getElementById("search");
const lista = document.getElementById("paisList");
const items = lista.getElementsByTagName("li");

input.addEventListener("input", () => {
    const filtro = input.value.toLowerCase();
    Array.from(items).forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(filtro) ? "" : "none";
    });
});
