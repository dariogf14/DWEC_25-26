const elements = {
  viewport: document.getElementById('viewport'),
  outer: document.getElementById('outer'),
  position: document.getElementById('position'),
  resolution: document.getElementById('resolution'),
  available: document.getElementById('available'),
  connection: document.getElementById('connection'),
  indicator: document.getElementById('indicator')
};

let lastPosition = { x: window.screenX, y: window.screenY };

function updateInfo() {
  elements.viewport.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  elements.outer.textContent = `${window.outerWidth} x ${window.outerHeight}`;
  elements.resolution.textContent = `${screen.width} x ${screen.height}`;
  elements.available.textContent = `${screen.availWidth} x ${screen.availHeight}`;
  updateConnectionStatus();
}

function updatePosition() {
  if (window.screenX !== lastPosition.x || window.screenY !== lastPosition.y) {
    lastPosition = { x: window.screenX, y: window.screenY };
    elements.position.textContent = `${lastPosition.x}, ${lastPosition.y}`;
  }
}

function updateConnectionStatus() {
  const online = navigator.onLine;
  elements.connection.textContent = online ? 'Online' : 'Offline';
  elements.indicator.style.backgroundColor = online ? 'green' : 'red';
}

window.addEventListener('resize', updateInfo);
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

setInterval(updatePosition, 250);

document.addEventListener('DOMContentLoaded', () => {
  updateInfo();
  updatePosition();
});