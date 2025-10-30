const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const content = document.getElementById('content');
const links = document.querySelectorAll('nav a');

function navigate(path, addToHistory = true) {
  const route = path.replace('/', '') || 'inicio';
  const pageContent = pages[route] || '<h1>404</h1><p>Página no encontrada</p>';

  content.innerHTML = pageContent;

  if (addToHistory) {
    history.pushState({ route }, '', path);
  }
}

links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    navigate(path);
  });
});

window.addEventListener('popstate', (event) => {
  const route = event.state?.route || 'inicio';
  navigate(`/${route}`, false);
});

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  navigate(path, false);
});