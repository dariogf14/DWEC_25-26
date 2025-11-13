document.addEventListener("DOMContentLoaded", () => {
const inputCodigo = document.getElementById("codigo");
const inputClave = document.getElementById("clave");
const msgCodigo = document.getElementById("msg-codigo");
const msgClave = document.getElementById("msg-clave");
const btnAcceder = document.getElementById("acceder");

let agenteEncontrado = null;
let codigoValido = false;
let claveValida = false;

inputCodigo.addEventListener("blur", () => {
    const codigo = inputCodigo.value.trim();
    if (!codigo) return;

    fetch("personal.xml")
        .then(res => res.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "application/xml");
            const agente = xml.querySelector(`agente[codigo="${codigo}"]`);
            
            if (agente) {
                const nombre = agente.querySelector("nombre").textContent;
                msgCodigo.textContent = `Bienvenido, ${nombre}`;
                msgCodigo.style.color = "green";
                agenteEncontrado = agente;
                codigoValido = true;
            } else {
                msgCodigo.textContent = "Código de agente no reconocido";
                msgCodigo.style.color = "red";
                agenteEncontrado = null;
                codigoValido = false;
            }

            claveValida = false;
            inputClave.value = "";
            msgClave.textContent = "";
            btnAcceder.disabled = true;
        });
});

inputClave.addEventListener("blur", () => {
    if (!codigoValido || !agenteEncontrado) {
        msgClave.textContent = "Primero valida el código de agente.";
        msgClave.style.color = "gray";
        return;
    }

    const claveIngresada = inputClave.value.trim();
    const claveReal = agenteEncontrado.querySelector("clave").textContent;

    if (claveIngresada === claveReal) {
        msgClave.textContent = "Clave correcta";
        msgClave.style.color = "green";
        claveValida = true;
    } else {
        msgClave.textContent = "Clave incorrecta";
        msgClave.style.color = "red";
        claveValida = false;
    }

    btnAcceder.disabled = !(codigoValido && claveValida);
});

inputCodigo.addEventListener("input", () => {
    msgCodigo.textContent = "";
    msgClave.textContent = "";
    inputClave.value = "";
    codigoValido = false;
    claveValida = false;
    agenteEncontrado = null;
    btnAcceder.disabled = true;
});

});