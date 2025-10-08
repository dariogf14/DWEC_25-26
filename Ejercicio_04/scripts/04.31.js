document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('#lista-cursos .card');
    const reactCard = Array.from(cards).find(c =>
      c.querySelector('h2')?.textContent.trim().includes('React')
    );
    if (!reactCard) return;
  
    const pOculto = reactCard.querySelector('.oculto');
    if (pOculto) {
      pOculto.textContent = pOculto.textContent + ' (¡Oferta especial!)';
    }
});  