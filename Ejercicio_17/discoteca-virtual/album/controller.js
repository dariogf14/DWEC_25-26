const Album = require('./model');
const Artista = require('../artista/model');

function list(req, res) {
  const albumes = Album.getAll().map(album => {
    const artista = Artista.getById(album.artistaId);

    return {
      ...album,
      artistaNombre: artista ? artista.nombre : 'Artista desconocido'
    };
  });

  res.render('albumes', {
    title: 'Lista de Álbumes',
    albumes
  });
}

function form(req, res) {
  const id = req.params.id;
  const album = id
    ? Album.getById(id)
    : {
        id: '',
        titulo: '',
        anio: '',
        artistaId: '',
        foto: ''
      };

  if (id && !album) {
    return res.status(404).render('error', {
      title: 'Álbum no encontrado',
      mensaje: 'No existe ningún álbum con ese ID.'
    });
  }

  res.render('album-form', {
    title: id ? 'Editar Álbum' : 'Añadir Nuevo Álbum',
    album,
    artistas: Artista.getAll(),
    error: null
  });
}

function save(req, res) {
  const { id, titulo, anio, artistaId } = req.body;
  const errores = [];

  if (!titulo || !titulo.trim()) {
    errores.push('El título no puede estar vacío.');
  }

  if (!anio || Number.isNaN(Number(anio))) {
    errores.push('El año no puede estar vacío y debe ser numérico.');
  }

  if (!artistaId || Number.isNaN(Number(artistaId))) {
    errores.push('Debes seleccionar un artista válido.');
  }

  if (errores.length > 0) {
    return res.status(400).render('album-form', {
      title: id ? 'Editar Álbum' : 'Añadir Nuevo Álbum',
      album: req.body,
      artistas: Artista.getAll(),
      error: errores.join(' ')
    });
  }

  Album.save(req.body);
  res.redirect('/albumes');
}

function remove(req, res) {
  Album.remove(req.params.id);
  res.redirect('/albumes');
}

module.exports = {
  list,
  form,
  save,
  remove
};
