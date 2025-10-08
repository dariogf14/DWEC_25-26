document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#lista-cursos .card').forEach(card => {
      const img = card.querySelector('img');
      if (img) img.classList.add('imagen-curso');
    });
});  