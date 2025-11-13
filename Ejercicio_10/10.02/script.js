document.addEventListener("DOMContentLoaded", () => {
const titulo = document.getElementById("titulo");
const fecha = document.getElementById("fecha");
const imagen = document.getElementById("imagen");
const descripcion = document.getElementById("descripcion");

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
const btnUltimo = document.getElementById("ultimo");

const listaHistorial = document.getElementById("lista-historial");

let documentoActual = "documento_ultimo.xml";
const visitados = new Map();

function cargarDocumento(nombreArchivo) {
    fetch(nombreArchivo)
        .then(res => res.text())
        .then(xmlString => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, "application/xml");
            mostrarDocumento(xml, nombreArchivo);
        })
        .catch(() => alert("No se pudo cargar el documento."));
}

function mostrarDocumento(xml, nombreArchivo) {
    const doc = xml.querySelector("documento");
    const id = doc.querySelector("id").textContent;
    const tituloDoc = doc.querySelector("titulo").textContent;
    const fechaDoc = doc.querySelector("fecha").textContent;
    const imagenDoc = doc.querySelector("imagen").textContent;
    const descripcionDoc = doc.querySelector("descripcion").textContent;
    const siguiente = doc.querySelector("siguiente").textContent;
    const anterior = doc.querySelector("anterior").textContent;

    titulo.textContent = tituloDoc;
    fecha.textContent = fechaDoc;
    imagen.src = imagenDoc;
    descripcion.textContent = descripcionDoc;

    documentoActual = nombreArchivo;

    btnSiguiente.disabled = (siguiente === "null");
    btnAnterior.disabled = (anterior === "null");

    btnSiguiente.onclick = () => cargarDocumento(siguiente);
    btnAnterior.onclick = () => cargarDocumento(anterior);
    btnUltimo.onclick = () => cargarDocumento("documento_ultimo.xml");

    if (!visitados.has(nombreArchivo)) {
        const li = document.createElement("li");
        li.textContent = `${tituloDoc} (${fechaDoc})`;
        li.dataset.archivo = nombreArchivo;
        li.addEventListener("click", () => cargarDocumento(li.dataset.archivo));
        listaHistorial.appendChild(li);
        visitados.set(nombreArchivo, true);
    }
}

cargarDocumento(documentoActual);

});