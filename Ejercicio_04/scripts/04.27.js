document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#lista-cursos .card:not(.premium)').forEach(card => {
      card.style.border = '2px dotted #000';
    });
});  