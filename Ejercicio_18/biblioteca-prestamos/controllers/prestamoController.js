const db = require('../config/db');
const Libro = require('../models/libroModel');
const Prestamo = require('../models/prestamoModel');

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function fechaDevolucionPorDefecto() {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 30);
  return fecha.toISOString().slice(0, 10);
}

async function formularioPrestamo(req, res) {
  try {
    const libro = await Libro.getById(req.params.libro_id);

    if (!libro) {
      return res.status(404).render('error', {
        title: 'Libro no encontrado',
        mensaje: 'No existe ningún libro con ese ID.'
      });
    }

    if (libro.estado === 'Prestado') {
      return res.redirect(`/libro/${libro.id}`);
    }

    res.render('prestamo-formulario', {
      title: 'Prestar Libro',
      libro,
      datos: {
        nombre_prestatario: '',
        fecha_prestamo: hoyISO(),
        fecha_devolucion: fechaDevolucionPorDefecto()
      },
      error: null
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function nuevoPrestamo(req, res) {
  const connection = await db.getConnection();

  try {
    const { libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion } = req.body;
    const libro = await Libro.getById(libro_id);

    if (!libro) {
      return res.status(404).render('error', {
        title: 'Libro no encontrado',
        mensaje: 'No existe ningún libro con ese ID.'
      });
    }

    const errores = [];

    if (!nombre_prestatario || !nombre_prestatario.trim()) {
      errores.push('El nombre del prestatario es obligatorio.');
    }

    if (!fecha_prestamo) {
      errores.push('La fecha de préstamo es obligatoria.');
    }

    if (!fecha_devolucion) {
      errores.push('La fecha de devolución es obligatoria.');
    }

    if (libro.estado === 'Prestado') {
      errores.push('El libro ya está prestado.');
    }

    if (errores.length > 0) {
      return res.status(400).render('prestamo-formulario', {
        title: 'Prestar Libro',
        libro,
        datos: req.body,
        error: errores.join(' ')
      });
    }

    await connection.beginTransaction();

    await Prestamo.crearPrestamo({
      libro_id: Number(libro_id),
      nombre_prestatario: nombre_prestatario.trim(),
      fecha_prestamo,
      fecha_devolucion
    }, connection);

    await Libro.updateEstado(libro_id, 'Prestado', connection);

    await connection.commit();

    res.redirect(`/libro/${libro_id}`);
  } catch (error) {
    await connection.rollback();
    renderError(res, error);
  } finally {
    connection.release();
  }
}

async function devolverLibro(req, res) {
  const connection = await db.getConnection();

  try {
    const libroId = req.params.libro_id;
    const prestamoActivo = await Prestamo.getActivoByLibroId(libroId);

    if (!prestamoActivo) {
      return res.redirect(`/libro/${libroId}`);
    }

    await connection.beginTransaction();

    await Prestamo.registrarEntrega(prestamoActivo.id, connection);
    await Libro.updateEstado(libroId, 'Disponible', connection);

    await connection.commit();

    res.redirect(`/libro/${libroId}`);
  } catch (error) {
    await connection.rollback();
    renderError(res, error);
  } finally {
    connection.release();
  }
}

function renderError(res, error) {
  console.error(error);

  res.status(500).render('error', {
    title: 'Error interno',
    mensaje: 'Ha ocurrido un error al procesar la operación de préstamo.'
  });
}

module.exports = {
  formularioPrestamo,
  nuevoPrestamo,
  devolverLibro
};
