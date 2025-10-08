document.addEventListener('DOMContentLoaded', () => {
    const categorias = Array.from(document.querySelectorAll('#lista-cursos .card .categoria'))
      .map(p => p.textContent.trim());
    console.log('Categorías:', categorias);
});  