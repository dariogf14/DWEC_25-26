const banner = document.getElementById('banner');
const bannerTexto = document.getElementById('bannerTexto');
const cerrarBanner = document.getElementById('cerrarBanner');

document.addEventListener('DOMContentLoaded', gestionarUltimaVisita);

function gestionarUltimaVisita() {
  const ultimaVisita = obtenerCookie('ultimaVisita');

  if (ultimaVisita) {
    bannerTexto.textContent = `Bienvenido de nuevo. Tu última visita fue el ${decodeURIComponent(ultimaVisita)}`;
    banner.classList.remove('hidden');
  }

  const ahora = new Date().toLocaleString('es-ES');
  crearCookie('ultimaVisita', ahora, 30);
}

function crearCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);

  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`;
}

function obtenerCookie(nombre) {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [clave, valor] = cookie.trim().split('=');

    if (clave === nombre) {
      return valor;
    }
  }

  return null;
}

cerrarBanner.addEventListener('click', () => {
  banner.classList.add('hidden');
});
