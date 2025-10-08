document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#lista-cursos .card h2').forEach(h2 => {
      const prefijo = '[CURSO] ';
      if (!h2.textContent.trim().startsWith(prefijo)) {
        h2.textContent = prefijo + h2.textContent.trim();
      }
    });
  });  