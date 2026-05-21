const Alumno = require('../models/alumnoModel');
const filebaseService = require('../services/filebaseService');

async function index(req, res) {
  try {
    const alumnos = await Alumno.getAll();

    res.render('index', {
      title: 'Registro de Alumnos',
      alumnos,
      error: null,
      getPublicImageUrl: filebaseService.getPublicImageUrl
    });
  } catch (error) {
    renderError(res, error);
  }
}

async function create(req, res) {
  try {
    const { nombre, apellidos, localidad } = req.body;

    if (!nombre || !apellidos) {
      const alumnos = await Alumno.getAll();
      return res.status(400).render('index', {
        title: 'Registro de Alumnos',
        alumnos,
        error: 'El nombre y los apellidos son obligatorios.',
        getPublicImageUrl: filebaseService.getPublicImageUrl
      });
    }

    const imageName = await filebaseService.uploadImage(req.file);

    await Alumno.create({
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      localidad: localidad ? localidad.trim() : '',
      imagen: imageName
    });

    res.redirect('/');
  } catch (error) {
    renderError(res, error);
  }
}

async function remove(req, res) {
  try {
    const alumno = await Alumno.getById(req.params.id);
    if (!alumno) return res.redirect('/');

    await filebaseService.deleteImage(alumno.imagen);
    await Alumno.remove(alumno.id);

    res.redirect('/');
  } catch (error) {
    renderError(res, error);
  }
}

function renderError(res, error) {
  console.error(error);
  res.status(500).render('error', {
    title: 'Error interno',
    message: 'Ha ocurrido un error al procesar la operación.'
  });
}

async function showImage(req, res) {
  try {
    const fileName = req.params.fileName;
    const image = await filebaseService.getImage(fileName);

    if (!image || !image.Body) {
      return res.status(404).send('Imagen no encontrada');
    }

    res.setHeader('Content-Type', image.ContentType || 'image/jpeg');
    image.Body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(404).send('Imagen no encontrada');
  }
}

module.exports = {
  index,
  create,
  remove,
  showImage
};
