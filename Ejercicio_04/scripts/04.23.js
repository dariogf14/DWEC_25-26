const cards = document.querySelectorAll('#lista-cursos .card');
const reactCard = Array.from(cards).find(c =>
  c.querySelector('h2')?.textContent.trim() === 'Introducción a React'
);

if (!reactCard) return;

const tituloReact = reactCard.querySelector('h2');
const parrafoOculto = reactCard.querySelector('.oculto');

if (tituloReact && parrafoOculto) {
  tituloReact.addEventListener('click', () => {
    parrafoOculto.classList.remove('oculto');
    parrafoOculto.hidden = false;
    parrafoOculto.style.display = '';
  });
}