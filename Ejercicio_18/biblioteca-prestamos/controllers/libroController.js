const Libro = require('../models/libroModel');
const Prestamo = require('../models/prestamoModel');

function formatDate(fecha) {
  if (!fecha) return '-';
  return new Date(fecha).toLocaleDateString('es-ES');
}

async function catalogo(req, res) {
  try {
    const libros = await Libro.getAll();

    res.render('catalogo', {
      title: 'Catálogo de Biblioteca',
      libros
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function prestados(req, res) {
  try {
    const libros = await Libro.getPrestados();

    res.render('prestados', {
      title: 'Libros Prestados',
      libros,
      formatDate
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function prestamosUsuario(req, res) {
  try {
    const nombre = req.query.nombre;

    if (!nombre) {
      return res.status(400).render('error', {
        title: 'Falta el usuario',
        mensaje: 'Debes indicar un nombre de prestatario en la URL.'
      });
    }

    const prestamos = await Prestamo.getActivosByUsuario(nombre);

    res.render('prestamos-usuario', {
      title: `Préstamos de ${nombre}`,
      nombre,
      prestamos,
      formatDate
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function detalleLibro(req, res) {
  try {
    const libro = await Libro.getById(req.params.id);

    if (!libro) {
      return res.status(404).render('error', {
        title: 'Libro no encontrado',
        mensaje: 'No existe ningún libro con ese ID.'
      });
    }

    const historial = await Prestamo.getHistorialByLibroId(libro.id);
    const prestamoActivo = await Prestamo.getActivoByLibroId(libro.id);

    res.render('libro-detalle', {
      title: libro.titulo,
      libro,
      historial,
      prestamoActivo,
      formatDate
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function vencidos(req, res) {
  try {
    const libros = await Libro.getVencidos();

    res.render('vencidos', {
      title: 'Libros Vencidos',
      libros,
      formatDate
    });
  } catch (error) {
    renderError(res, error);
  }
}

function renderError(res, error) {
  console.error(error);

  res.status(500).render('error', {
    title: 'Error interno',
    mensaje: 'Ha ocurrido un error al procesar la petición. Revisa la conexión con MySQL y los logs.'
  });
}

module.exports = {
  catalogo,
  prestados,
  prestamosUsuario,
  detalleLibro,
  vencidos
};
