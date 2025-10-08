document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navegacion a').forEach(a => {
      a.dataset.tipo = 'enlace-nav';
    });
});  