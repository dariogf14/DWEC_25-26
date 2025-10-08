document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#lista-cursos .card').forEach(card => {
      const cat = card.querySelector('.categoria')?.textContent.trim();
      if (cat === 'Desarrollo Web') {
        card.style.backgroundColor = '#f0f0f0';
      }
    });
  });  