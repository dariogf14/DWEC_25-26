document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#lista-cursos .card .info').forEach(info => {
      const p = document.createElement('p');
      p.className = 'duracion';
      p.textContent = 'Duración: 20 horas';
      info.appendChild(p);
    });
  });  