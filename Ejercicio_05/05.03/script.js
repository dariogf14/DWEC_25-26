function revelarRespuesta(h2) {
  ocultarTodasLasRespuestas();
  h2.nextElementSibling.classList.remove('oculto');
}

function ocultarTodasLasRespuestas() {
  document.querySelectorAll('p').forEach(p => p.classList.add('oculto'));
}