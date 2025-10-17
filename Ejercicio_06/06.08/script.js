const lista = document.getElementById("lista");

function actualizarBotones() {
    const items = lista.querySelectorAll("li");
    items.forEach((item, index) => {
        const btnUp = item.querySelector(".up");
        const btnDown = item.querySelector(".down");
        btnUp.disabled = index === 0;
        btnDown.disabled = index === items.length - 1;
    });
}

lista.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() !== "button") return;
    const li = e.target.parentElement;
    if (e.target.classList.contains("up") && li.previousElementSibling) {
        lista.insertBefore(li, li.previousElementSibling);
    }
    if (e.target.classList.contains("down") && li.nextElementSibling) {
        lista.insertBefore(li.nextElementSibling, li);
    }
    actualizarBotones();
});

actualizarBotones();