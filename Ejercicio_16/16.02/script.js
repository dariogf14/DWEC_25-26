const eventosContainer = document.getElementById("eventosContainer");
const mensaje = document.getElementById("mensaje");

let eventos = [];
let intervalo = null;

document.addEventListener("DOMContentLoaded", cargarEventos);

async function cargarEventos() {
  try {
    const respuesta = await fetch("./eventos.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar eventos.json");
    }

    const datos = await respuesta.json();

    eventos = datos
      .map(evento => ({
        ...evento,
        fechaDate: crearFecha(evento.fecha)
      }))
      .filter(evento => evento.fechaDate instanceof Date && !Number.isNaN(evento.fechaDate.getTime()))
      .sort((a, b) => a.fechaDate - b.fechaDate);

    renderizarEventos();
    iniciarContadores();

    mensaje.textContent = `Eventos cargados: ${eventos.length}`;
  } catch (error) {
    mensaje.textContent = "Error al cargar los eventos.";
    mensaje.classList.add("error");
    console.error(error);
  }
}

function crearFecha(entrada, mes, dia) {
  if (arguments.length === 3) {
    return new Date(entrada, mes, dia);
  }

  if (typeof entrada === "number") {
    return new Date(entrada);
  }

  if (typeof entrada === "string") {
    return new Date(`${entrada}T00:00:00`);
  }

  if (typeof entrada === "object" && entrada !== null) {
    return new Date(entrada.anio, entrada.mes, entrada.dia);
  }

  return new Date("fecha-invalida");
}

function renderizarEventos() {
  eventosContainer.innerHTML = "";

  eventos.forEach(evento => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.id = evento.id;

    card.innerHTML = `
      <h2>${evento.titulo}</h2>
      <p class="description">${evento.descripcion}</p>
      <p class="date">Fecha: <span>${formatearFecha(evento.fechaDate)}</span></p>
      <div class="countdown" id="countdown-${evento.id}">Calculando...</div>

      <form class="form-postpone" data-id="${evento.id}">
        <input type="number" min="1" placeholder="Días a sumar" />
        <button type="submit">Posponer</button>
      </form>
    `;

    eventosContainer.appendChild(card);
  });

  document.querySelectorAll(".form-postpone").forEach(form => {
    form.addEventListener("submit", posponerEvento);
  });
}

function iniciarContadores() {
  if (intervalo) {
    clearInterval(intervalo);
  }

  actualizarContadores();
  intervalo = setInterval(actualizarContadores, 1000);
}

function actualizarContadores() {
  eventos.forEach(evento => {
    const countdown = document.getElementById(`countdown-${evento.id}`);

    if (!countdown) {
      return;
    }

    const diferencia = evento.fechaDate - Date.now();

    if (diferencia <= 0) {
      countdown.textContent = "FINALIZADO";
      countdown.classList.add("finished");
      return;
    }

    countdown.classList.remove("finished");
    countdown.textContent = convertirMilisegundos(diferencia);
  });
}

function convertirMilisegundos(ms) {
  const segundosTotales = Math.floor(ms / 1000);

  const dias = Math.floor(segundosTotales / 86400);
  const horas = Math.floor((segundosTotales % 86400) / 3600);
  const minutos = Math.floor((segundosTotales % 3600) / 60);
  const segundos = segundosTotales % 60;

  return `${dias}d ${String(horas).padStart(2, "0")}h ${String(minutos).padStart(2, "0")}m ${String(segundos).padStart(2, "0")}s`;
}

function posponerEvento(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const id = Number(form.dataset.id);
  const input = form.querySelector("input");
  const dias = Number(input.value);

  if (!dias || dias <= 0) {
    alert("Introduce un número válido de días.");
    return;
  }

  const evento = eventos.find(item => item.id === id);

  if (!evento) {
    return;
  }

  // Date autocorrige automáticamente el cambio de mes/año.
  evento.fechaDate.setDate(evento.fechaDate.getDate() + dias);

  eventos.sort((a, b) => a.fechaDate - b.fechaDate);

  renderizarEventos();
  actualizarContadores();

  input.value = "";
}

function formatearFecha(fecha) {
  return fecha.toLocaleDateString("es-ES");
}
