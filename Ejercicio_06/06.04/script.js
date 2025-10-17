const container = document.getElementById("colorContainer");

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("color")) {
        document.body.style.backgroundColor = e.target.dataset.color;
    }
});