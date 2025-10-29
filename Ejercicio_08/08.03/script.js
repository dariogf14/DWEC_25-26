let itinerario = [];

const selectDestino = document.getElementById('selectDestino');
const tiposCheckboxes = document.getElementById('tiposCheckboxes');
const precioMax = document.getElementById('precioMax');
const precioValor = document.getElementById('precioValor');
const contenedorActividades = document.getElementById('contenedorActividades');
const contadorResultados = document.getElementById('contadorResultados');

const listaItinerario = document.getElementById('listaItinerario');
const numActividadesEl = document.getElementById('numActividades');
const duracionTotalEl = document.getElementById('duracionTotal');
const costeTotalEl = document.getElementById('costeTotal');

const resetFiltrosBtn = document.getElementById('resetFiltros');

const formReserva = document.getElementById('formReserva');
const nombreCompleto = document.getElementById('nombreCompleto');
const email = document.getElementById('email');
const fechaInicio = document.getElementById('fechaInicio');
const codigoDescuento = document.getElementById('codigoDescuento');
const seguro = document.getElementById('seguro');
const seguroContainer = document.getElementById('seguroContainer');

const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const errorFecha = document.getElementById('errorFecha');
const errorCodigo = document.getElementById('errorCodigo');
const errorSeguro = document.getElementById('errorSeguro');
const erroresGenerales = document.getElementById('erroresGenerales');

const formFiltros = document.getElementById('formFiltros');

window.addEventListener('DOMContentLoaded', () => {
  poblarDestinos();
  poblarTipos();
  ajustarRangoPrecio();
  precioValor.textContent = precioMax.value;

  renderActividades(actividades);
  actualizarItinerarioUI();
});

function poblarDestinos() {
  const destinos = Array.from(new Set(actividades.map(a => a.destino)));
  selectDestino.innerHTML = `<option value="Todas">Todas</option>` +
    destinos.map(d => `<option value="${d}">${d}</option>`).join('');
}

function poblarTipos() {
  const tipos = Array.from(new Set(actividades.map(a => a.tipo)));
  tiposCheckboxes.innerHTML = tipos.map(t => {
    const id = `tipo-${t.replace(/\s+/g,'')}`;
    return `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="${t}" id="${id}">
      <label class="form-check-label" for="${id}">${t}</label>
    </div>`;
  }).join('');
}

function ajustarRangoPrecio() {
  const maxPrecio = Math.ceil(Math.max(...actividades.map(a => a.precio), 100));
  precioMax.max = Math.max(1000, maxPrecio);
  precioMax.value = precioMax.max;
}

function renderActividades(list) {
  contenedorActividades.innerHTML = '';
  if (list.length === 0) {
    contenedorActividades.innerHTML = `<div class="col-12"><div class="alert alert-secondary">No hay actividades que coincidan con los filtros.</div></div>`;
    contadorResultados.textContent = '0 resultados';
    return;
  }

  contadorResultados.textContent = `${list.length} resultados`;

  list.forEach(a => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    col.innerHTML = `
      <div class="card actividad-card h-100 shadow-sm">
        <img src="${a.imagen}" class="card-img-top" alt="${a.nombre}">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${a.nombre}</h6>
          <p class="card-text mb-1"><small class="text-muted">${a.destino} • ${a.tipo}</small></p>
          <p class="mb-2 fw-bold">${a.precio.toFixed(2)} € • ${a.duracionHoras} h</p>
          <div class="mt-auto">
            <button class="btn btn-sm btn-outline-primary w-100" data-id="${a.id}">Añadir al Itinerario</button>
          </div>
        </div>
      </div>
    `;
    contenedorActividades.appendChild(col);
  });

  contenedorActividades.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      añadirAlItinerario(id);
    });
  });
}

// Filtros

function obtenerFiltros() {
  const destino = selectDestino.value;
  const tiposSeleccionados = Array.from(tiposCheckboxes.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value);
  const precio = parseFloat(precioMax.value);
  return { destino, tiposSeleccionados, precio };
}

function aplicarFiltrosYRender() {
  const { destino, tiposSeleccionados, precio } = obtenerFiltros();
  let lista = actividades.slice();

  // Destino
  if (destino && destino !== 'Todas') {
    lista = lista.filter(a => a.destino === destino);
  }

  // Tipos
  if (tiposSeleccionados.length > 0) {
    lista = lista.filter(a => tiposSeleccionados.includes(a.tipo));
  }

  // Precio máximo
  lista = lista.filter(a => a.precio <= precio);

  renderActividades(lista);
}

function añadirAlItinerario(id) {
  const actividad = actividades.find(a => a.id === id);
  if (!actividad) return;

  if (itinerario.some(i => i.id === id)) {
    alert('La actividad ya está en el itinerario.');
    return;
  }

  itinerario.push(actividad);
  actualizarItinerarioUI();
}

function quitarDelItinerario(id) {
  itinerario = itinerario.filter(i => i.id !== id);
  actualizarItinerarioUI();
}

function calcularTotales() {
  const num = itinerario.length;
  const duracion = itinerario.reduce((acc, i) => acc + (i.duracionHoras || 0), 0);
  const coste = itinerario.reduce((acc, i) => acc + (i.precio || 0), 0);
  return { num, duracion, coste };
}

function actualizarItinerarioUI() {
  listaItinerario.innerHTML = '';
  if (itinerario.length === 0) {
    listaItinerario.innerHTML = `<div class="text-muted small">No has añadido actividades al itinerario.</div>`;
  } else {
    itinerario.forEach(i => {
      const item = document.createElement('div');
      item.className = 'list-group-item d-flex justify-content-between align-items-start';
      item.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${i.nombre}</div>
          <small class="text-muted">${i.destino} • ${i.tipo} • ${i.duracionHoras} h</small>
        </div>
        <div class="text-end">
          <div class="fw-bold">${i.precio.toFixed(2)} €</div>
          <button class="btn btn-sm btn-outline-danger mt-2" data-id="${i.id}">Quitar</button>
        </div>
      `;
      listaItinerario.appendChild(item);
    });

    listaItinerario.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        quitarDelItinerario(id);
      });
    });
  }

  const { num, duracion, coste } = calcularTotales();
  numActividadesEl.textContent = num;
  duracionTotalEl.textContent = duracion;
  costeTotalEl.textContent = `${coste.toFixed(2)} €`;

  if (coste > 1000) {
    seguroContainer.style.display = 'block';
    seguro.required = true;
  } else {
    seguroContainer.style.display = 'none';
    seguro.required = false;
    seguro.checked = false;
    errorSeguro.textContent = '';
    seguro.classList.remove('campo-error');
  }
}

// Validaciones

function limpiarErroresUI() {
  errorNombre.textContent = '';
  errorEmail.textContent = '';
  errorFecha.textContent = '';
  errorCodigo.textContent = '';
  errorSeguro.textContent = '';
  erroresGenerales.innerHTML = '';
  [nombreCompleto, email, fechaInicio, codigoDescuento, seguro].forEach(el => el.classList.remove('campo-error'));
}

function validarFormulario(e) {
  e.preventDefault();
  limpiarErroresUI();

  const { coste } = calcularTotales();
  const errores = [];

  // Itinerario
  if (itinerario.length === 0) {
    errores.push('El itinerario no puede estar vacío. Añade al menos una actividad.');
  }

  // Nombre
  if (!nombreCompleto.value.trim()) {
    errorNombre.textContent = 'Introduce tu nombre completo.';
    nombreCompleto.classList.add('campo-error');
    errores.push('Nombre vacío');
  }

  // Email 
  if (!email.value.trim()) {
    errorEmail.textContent = 'Introduce tu email.';
    email.classList.add('campo-error');
    errores.push('Email vacío');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    errorEmail.textContent = 'Formato de email no válido.';
    email.classList.add('campo-error');
    errores.push('Email inválido');
  }

  // Fecha
  if (!fechaInicio.value) {
    errorFecha.textContent = 'Selecciona una fecha de inicio.';
    fechaInicio.classList.add('campo-error');
    errores.push('Fecha vacía');
  } else {
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    const fechaSel = new Date(fechaInicio.value);
    if (fechaSel < hoy) {
      errorFecha.textContent = 'La fecha de inicio no puede ser anterior a hoy.';
      fechaInicio.classList.add('campo-error');
      errores.push('Fecha pasada');
    }
  }

  // Código descuento
  const codigo = codigoDescuento.value.trim();
  if (codigo) {
    if (!/^[A-Za-z]{4}\d{2}$/.test(codigo)) {
      errorCodigo.textContent = 'El código debe tener formato: 4 letras + 2 números (ej: ABCD25).';
      codigoDescuento.classList.add('campo-error');
      errores.push('Código descuento inválido');
    }
  }

  // Seguro obligatorio
  if (coste > 1000) {
    if (!seguro.checked) {
      errorSeguro.textContent = 'El seguro de viaje es obligatorio para reservas superiores a 1000€.';
      seguro.classList.add('campo-error');
      errores.push('Seguro requerido');
    }
  }

  if (errores.length > 0) {
    erroresGenerales.innerHTML = `<div class="alert alert-danger py-2">Hay ${errores.length} error(es). Revisa los campos marcados.</div>`;
    return false;
  }

  mostrarResumenYEnviar();
  return true;
}

function mostrarResumenYEnviar() {
  const { coste, duracion, num } = calcularTotales();
  const listaNombres = itinerario.map(i => `${i.nombre} (${i.destino})`).join('\n - ');
  const resumen = `
RESUMEN DE RESERVA
Nombre: ${nombreCompleto.value.trim()}
Email: ${email.value.trim()}
Fecha inicio: ${fechaInicio.value}
Actividades (${num}): 
 - ${listaNombres}

Duración total: ${duracion} horas
Coste total: ${coste.toFixed(2)} €

Código descuento: ${codigoDescuento.value.trim() || 'N/A'}
Seguro: ${seguro.checked ? 'Sí' : 'No'}
  `;
  alert(resumen);

  formReserva.reset();
  itinerario = [];
  actualizarItinerarioUI();
  aplicarFiltrosYRender();
}

//Listeners

selectDestino.addEventListener('change', aplicarFiltrosYRender);
precioMax.addEventListener('input', () => {
  precioValor.textContent = precioMax.value;
  aplicarFiltrosYRender();
});
resetFiltrosBtn.addEventListener('click', () => {
  selectDestino.value = 'Todas';
  tiposCheckboxes.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  precioMax.value = precioMax.max;
  precioValor.textContent = precioMax.value;
  aplicarFiltrosYRender();
});

tiposCheckboxes.addEventListener('change', aplicarFiltrosYRender);

formReserva.addEventListener('submit', validarFormulario);