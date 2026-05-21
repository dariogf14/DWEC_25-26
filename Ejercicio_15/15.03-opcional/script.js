const form = document.getElementById('pointForm');
const latitudInput = document.getElementById('latitud');
const longitudInput = document.getElementById('longitud');
const pointsList = document.getElementById('pointsList');
const totalDistance = document.getElementById('totalDistance');
const message = document.getElementById('message');
const clearBtn = document.getElementById('clearBtn');

let points = [];
let markers = [];
let polyline = null;
let totalKm = 0;

const map = L.map('map').setView([40.4168, -3.7038], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 300);

form.addEventListener('submit', async event => {
  event.preventDefault();

  const lat = Number(latitudInput.value);
  const lon = Number(longitudInput.value);

  if (!validarCoordenadas(lat, lon)) {
    mostrarMensaje('Introduce coordenadas válidas.', true);
    return;
  }

  try {
    mostrarMensaje('Buscando dirección aproximada...');

    const address = await obtenerDireccion(lat, lon);
    anadirPunto(lat, lon, address);

    form.reset();
    mostrarMensaje('Punto añadido correctamente.');
  } catch (error) {
    mostrarMensaje('No se pudo obtener la dirección, pero puedes intentarlo de nuevo.', true);
    console.error(error);
  }
});

clearBtn.addEventListener('click', limpiarRuta);

function validarCoordenadas(lat, lon) {
  return !Number.isNaN(lat)
    && !Number.isNaN(lon)
    && lat >= -90
    && lat <= 90
    && lon >= -180
    && lon <= 180;
}

async function obtenerDireccion(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error en Nominatim');
  }

  const data = await response.json();

  return data.display_name || 'Dirección no encontrada';
}

function anadirPunto(lat, lon, address) {
  const point = { lat, lon, address };
  const previousPoint = points[points.length - 1];

  points.push(point);

  if (previousPoint) {
    totalKm += calcularDistanciaHaversine(previousPoint.lat, previousPoint.lon, lat, lon);
  }

  const marker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup(`<strong>Punto ${points.length}</strong><br>${address}`);

  markers.push(marker);

  actualizarPolyline();
  renderPoints();

  map.setView([lat, lon], 12);
}

function actualizarPolyline() {
  const coords = points.map(point => [point.lat, point.lon]);

  if (polyline) {
    polyline.remove();
  }

  if (coords.length >= 2) {
    polyline = L.polyline(coords, { weight: 4 }).addTo(map);
    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
  }
}

function renderPoints() {
  pointsList.innerHTML = '';

  points.forEach((point, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <strong>Punto ${index + 1}</strong><br>
      Coordenadas: ${point.lat}, ${point.lon}<br>
      Dirección: ${point.address}
    `;

    pointsList.appendChild(li);
  });

  totalDistance.textContent = `${totalKm.toFixed(2)} km`;
}

function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
  const radioTierraKm = 6371;

  const dLat = gradosARadianes(lat2 - lat1);
  const dLon = gradosARadianes(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(gradosARadianes(lat1)) *
    Math.cos(gradosARadianes(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radioTierraKm * c;
}

function gradosARadianes(grados) {
  return grados * Math.PI / 180;
}

function limpiarRuta() {
  points = [];
  totalKm = 0;

  markers.forEach(marker => marker.remove());
  markers = [];

  if (polyline) {
    polyline.remove();
    polyline = null;
  }

  pointsList.innerHTML = '';
  totalDistance.textContent = '0.00 km';
  map.setView([40.4168, -3.7038], 6);
  mostrarMensaje('Ruta limpiada.');
}

function mostrarMensaje(texto, isError = false) {
  message.textContent = texto;
  message.classList.remove('hidden', 'error');

  if (isError) {
    message.classList.add('error');
  }

  setTimeout(() => {
    message.classList.add('hidden');
  }, 3500);
}
