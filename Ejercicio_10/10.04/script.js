document.addEventListener("DOMContentLoaded", () => {
const startBtn = document.getElementById("start");
const textoFragmento = document.getElementById("texto-fragmento");
const pistaEl = document.getElementById("pista");
const alfabetoContainer = document.getElementById("alfabeto");
const letraSeleccionadaSpan = document.getElementById("letra-seleccionada");
const contadorIntentosSpan = document.getElementById("contador-intentos");
const estado = document.getElementById("estado");

let currentFragmentFile = null;
let currentSelector = null;
let currentLetraClave = null;
let intentos = 0;
let letraSeleccionada = null;

function crearAlfabeto() {
    const A_CODE = 65;
    for (let i = 0; i < 26; i++) {
        const letra = String.fromCharCode(A_CODE + i);
        const div = document.createElement("div");
        div.className = "letra";
        div.textContent = letra;
        div.dataset.letra = letra;
        alfabetoContainer.appendChild(div);
    }
}

crearAlfabeto();

function cargarFragmento(file) {
    fetch(file)
        .then(res => {
            if (!res.ok) throw new Error("No encontrado");
            return res.text();
        })
        .then(text => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");
            const man = xml.querySelector("manuscrito");
            if (!man) throw new Error("XML inválido");

            const texto = man.querySelector("texto")?.textContent || "";
            const pista = man.querySelector("pista")?.textContent || "";
            const selector_solucion = man.querySelector("selector_solucion")?.textContent || "";
            const siguiente = man.querySelector("siguiente_fragmento")?.textContent || null;
            const letra_clave = man.querySelector("letra_clave")?.textContent || null;

            currentFragmentFile = file;
            currentSelector = selector_solucion.trim();
            currentLetraClave = letra_clave ? letra_clave.trim().toUpperCase() : null;

            textoFragmento.textContent = texto;
            pistaEl.textContent = pista ? ("Pista: " + pista) : "";
            estado.textContent = `Fragmento: ${file}`;
            letraSeleccionada = null;
            letraSeleccionadaSpan.textContent = "—";
            document.querySelectorAll(".letra.selected").forEach(el => el.classList.remove("selected"));

            startBtn.dataset.siguiente = siguiente && siguiente !== "null" ? siguiente : "";
        })
        .catch(err => {
            textoFragmento.textContent = "";
            pistaEl.textContent = "";
            estado.textContent = "Error cargando fragmento: " + err.message;
        });
}

startBtn.addEventListener("click", () => {
    intentos = 0;
    contadorIntentosSpan.textContent = intentos;
    estado.textContent = "Cargando fragmento 1...";
    cargarFragmento("fragmento1.xml");
});

document.addEventListener("click", (e) => {
    const letraDiv = e.target.closest(".letra");
    if (letraDiv && alfabetoContainer.contains(letraDiv)) {
        document.querySelectorAll(".letra.selected").forEach(el => el.classList.remove("selected"));
        letraDiv.classList.add("selected");
        letraSeleccionada = letraDiv.dataset.letra;
        letraSeleccionadaSpan.textContent = letraSeleccionada;
        estado.textContent = `Letra ${letraSeleccionada} seleccionada`;
        return;
    }

    if (e.target === startBtn) return;

    if (!currentSelector) return;

    let node = e.target;
    let matched = null;
    while (node && node !== document) {
        try {
            if (node.matches && node.matches(currentSelector)) {
                matched = node;
                break;
            }
        } catch (err) {
            console.warn("Selector inválido:", currentSelector, err);
            break;
        }
        node = node.parentElement;
    }

    if (matched && letraSeleccionada && currentLetraClave && letraSeleccionada === currentLetraClave) {
        estado.textContent = "¡Correcto! Cargando siguiente fragmento...";
        const siguiente = startBtn.dataset.siguiente || "";
        if (siguiente) {
            setTimeout(() => {
                cargarFragmento(siguiente);
            }, 600);
        } else {
            estado.textContent = "¡Felicidades! Has completado el manuscrito.";
            currentSelector = null;
        }
        return;
    }

    intentos++;
    contadorIntentosSpan.textContent = intentos;

    const objetivo = matched || e.target;
    objetivo.classList.add("flash-red");
    setTimeout(() => objetivo.classList.remove("flash-red"), 700);

    if (!letraSeleccionada) {
        estado.textContent = "Fallo: selecciona primero una letra del alfabeto.";
    } else if (!matched) {
        estado.textContent = "Fallo: el elemento pulsado no corresponde al selector solución.";
    } else {
        stateMsg = "Fallo: la letra seleccionada no coincide con la letra clave.";
        estado.textContent = stateMsg;
    }
});

});