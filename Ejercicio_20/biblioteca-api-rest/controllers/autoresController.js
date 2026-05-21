const Autor = require('../models/Autor');
const Libro = require('../models/Libro');

async function getAutores(req, res) {
  const filtro = {};

  if (req.query.nacionalidad) {
    filtro.nacionalidad = req.query.nacionalidad;
  }

  const autores = await Autor.find(filtro).sort({ nombre: 1 });
  res.json(autores);
}

async function getAutorById(req, res) {
  const autor = await Autor.findOne({ referencia: req.params.id });

  if (!autor) {
    return res.status(404).json({
      error: 'Autor no encontrado'
    });
  }

  res.json(autor);
}

async function createAutor(req, res) {
  try {
    const nuevoAutor = await Autor.create(req.body);
    res.status(201).json(nuevoAutor);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function updateAutor(req, res) {
  const autor = await Autor.findOneAndUpdate(
    { referencia: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!autor) {
    return res.status(404).json({
      error: 'Autor no encontrado'
    });
  }

  res.json(autor);
}

async function deleteAutor(req, res) {
  const librosDelAutor = await Libro.countDocuments({ autor: req.params.id });

  if (librosDelAutor > 0) {
    return res.status(400).json({
      error: 'No se puede eliminar el autor porque tiene libros asociados'
    });
  }

  const autor = await Autor.findOneAndDelete({ referencia: req.params.id });

  if (!autor) {
    return res.status(404).json({
      error: 'Autor no encontrado'
    });
  }

  res.json({
    message: 'Autor eliminado correctamente',
    autor
  });
}

async function getLibrosByAutor(req, res) {
  const autor = await Autor.findOne({ referencia: req.params.id });

  if (!autor) {
    return res.status(404).json({
      error: 'Autor no encontrado'
    });
  }

  const libros = await Libro.find({ autor: req.params.id }).sort({ titulo: 1 });

  res.json({
    autor,
    libros
  });
}

module.exports = {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
  getLibrosByAutor
};
