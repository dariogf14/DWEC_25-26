const Artista = require('./model');
const Album = require('../album/model');

function list(req, res) {
  res.render('artistas', {
    title: 'Lista de Artistas',
    artistas: Artista.getAll()
  });
}

function detail(req, res) {
  const artista = Artista.getById(req.params.id);

  if (!artista) {
    return res.status(404).render('error', {
      title: 'Artista no encontrado',
      mensaje: 'No existe ningún artista con ese ID.'
    });
  }

  const albumes = Album.getByArtistaId(artista.id);

  res.render('artista-detail', {
    title: `Detalle de ${artista.nombre}`,
    artista,
    albumes
  });
}

function form(req, res) {
  const id = req.params.id;
  const artista = id
    ? Artista.getById(id)
    : {
        id: '',
        nombre: '',
        pais: '',
        genero: '',
        fecha_formacion: '',
        foto: ''
      };

  if (id && !artista) {
    return res.status(404).render('error', {
      title: 'Artista no encontrado',
      mensaje: 'No existe ningún artista con ese ID.'
    });
  }

  res.render('artista-form', {
    title: id ? 'Editar Artista' : 'Añadir Nuevo Artista',
    artista,
    error: null
  });
}

function save(req, res) {
  const { id, nombre, pais, genero, fecha_formacion } = req.body;
  const errores = [];

  if (!nombre || !nombre.trim()) {
    errores.push('El nombre no puede estar vacío.');
  }

  if (!pais || !pais.trim()) {
    errores.push('El país no puede estar vacío.');
  }

  if (!genero || !genero.trim()) {
    errores.push('El género no puede estar vacío.');
  }

  if (!fecha_formacion || Number.isNaN(Number(fecha_formacion))) {
    errores.push('El año de formación no puede estar vacío y debe ser numérico.');
  }

  if (errores.length > 0) {
    return res.status(400).render('artista-form', {
      title: id ? 'Editar Artista' : 'Añadir Nuevo Artista',
      artista: req.body,
      error: errores.join(' ')
    });
  }

  Artista.save(req.body);
  res.redirect('/artistas');
}

function remove(req, res) {
  const artistaId = Number(req.params.id);

  Artista.remove(artistaId);
  Album.removeByArtistaId(artistaId);

  res.redirect('/artistas');
}

module.exports = {
  list,
  detail,
  form,
  save,
  remove
};
