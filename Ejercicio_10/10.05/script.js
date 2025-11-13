document.addEventListener("DOMContentLoaded", () => {
const baseSelect = document.getElementById("materialBase");
const mezclaSelect = document.getElementById("materialMezcla");
const btnSintetizar = document.getElementById("btnSintetizar");
const textoResultado = document.getElementById("textoResultado");
const listaHistorial = document.getElementById("listaHistorial");

let xmlDoc = null;
const historial = [];

fetch("recetas.xml")
    .then(res => res.text())
    .then(xmlStr => {
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlStr, "application/xml");
        poblarSelects(xmlDoc);
    })
    .catch(err => {
        textoResultado.textContent = "Error al cargar recetas: " + err;
    });

function poblarSelects(xml) {
    const bases = new Set();
    const mezclas = new Set();

    xml.querySelectorAll("aleacion").forEach(aleacion => {
        bases.add(aleacion.querySelector("base").textContent);
        mezclas.add(aleacion.querySelector("mezcla").textContent);
    });

    baseSelect.innerHTML = [...bases].map(b => `<option value="${b}">${b}</option>`).join("");
    mezclaSelect.innerHTML = [...mezclas].map(m => `<option value="${m}">${m}</option>`).join("");
}

btnSintetizar.addEventListener("click", () => {
    if (!xmlDoc) return;

    const base = baseSelect.value;
    const mezcla = mezclaSelect.value;
    const combinacion = xmlDoc.querySelector(
        `aleacion:has(base:contains("${base}")):has(mezcla:contains("${mezcla}"))`
    );

    let encontrado = null;
    xmlDoc.querySelectorAll("aleacion").forEach(a => {
        const b = a.querySelector("base").textContent.trim();
        const m = a.querySelector("mezcla").textContent.trim();
        if (b === base && m === mezcla) {
            encontrado = a;
        }
    });

    if (encontrado) {
        const resultado = encontrado.querySelector("resultado").textContent;
        const descripcion = encontrado.querySelector("descripcion").textContent;
        textoResultado.textContent = `${base} + ${mezcla} = ${resultado}. ${descripcion}`;
        agregarAlHistorial(base, mezcla, resultado, descripcion);
    } else {
        textoResultado.textContent = "Combinación no válida. No se ha producido ninguna aleación.";
    }
});

function agregarAlHistorial(base, mezcla, resultado, descripcion) {
    const itemTexto = `${base} + ${mezcla} = ${resultado}`;
    const li = document.createElement("li");
    li.textContent = itemTexto;
    li.dataset.base = base;
    li.dataset.mezcla = mezcla;
    li.dataset.resultado = resultado;
    li.dataset.descripcion = descripcion;

    li.addEventListener("click", () => {
        baseSelect.value = li.dataset.base;
        mezclaSelect.value = li.dataset.mezcla;
        textoResultado.textContent = `${li.dataset.base} + ${li.dataset.mezcla} = ${li.dataset.resultado}. ${li.dataset.descripcion}`;
    });

    listaHistorial.appendChild(li);
    historial.push({ base, mezcla, resultado, descripcion });
}

});