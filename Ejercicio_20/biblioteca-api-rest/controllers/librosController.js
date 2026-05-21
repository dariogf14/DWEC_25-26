const Libro = require('../models/Libro');
const Autor = require('../models/Autor');

async function getLibros(req, res) {
  let query = Libro.find();

  if (req.query.sort === 'titulo') {
    query = query.sort({ titulo: 1 });
  }

  const libros = await query;
  res.json(libros);
}

async function getLibroById(req, res) {
  const libro = await Libro.findOne({ referencia: req.params.id });

  if (!libro) {
    return res.status(404).json({
      error: 'Libro no encontrado'
    });
  }

  const autor = await Autor.findOne({ referencia: libro.autor });

  res.json({
    ...libro.toObject(),
    autorDetalle: autor || null
  });
}

async function createLibro(req, res) {
  try {
    const autor = await Autor.findOne({ referencia: req.body.autor });

    if (!autor) {
      return res.status(400).json({
        error: 'El autor indicado no existe'
      });
    }

    const nuevoLibro = await Libro.create(req.body);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
}

async function updateLibro(req, res) {
  const libro = await Libro.findOneAndUpdate(
    { referencia: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!libro) {
    return res.status(404).json({
      error: 'Libro no encontrado'
    });
  }

  res.json(libro);
}

async function deleteLibro(req, res) {
  const libro = await Libro.findOneAndDelete({ referencia: req.params.id });

  if (!libro) {
    return res.status(404).json({
      error: 'Libro no encontrado'
    });
  }

  res.json({
    message: 'Libro eliminado correctamente',
    libro
  });
}

module.exports = {
  getLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};
