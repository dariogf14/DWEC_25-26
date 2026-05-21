let albumes = require('../data/albumes.json');

function getAll() {
  return albumes;
}

function getById(id) {
  return albumes.find(album => album.id === Number(id));
}

function getByArtistaId(artistaId) {
  return albumes.filter(album => album.artistaId === Number(artistaId));
}

function save(data) {
  const id = Number(data.id);

  const albumData = {
    titulo: data.titulo.trim(),
    anio: Number(data.anio),
    artistaId: Number(data.artistaId),
    foto: data.foto && data.foto.trim() ? data.foto.trim() : ''
  };

  if (id) {
    const index = albumes.findIndex(album => album.id === id);

    if (index !== -1) {
      albumes[index] = {
        id,
        ...albumData
      };

      return albumes[index];
    }
  }

  const newId = albumes.length > 0
    ? Math.max(...albumes.map(album => album.id)) + 1
    : 1;

  const nuevoAlbum = {
    id: newId,
    ...albumData
  };

  albumes.push(nuevoAlbum);
  return nuevoAlbum;
}

function remove(id) {
  const numericId = Number(id);
  albumes = albumes.filter(album => album.id !== numericId);
}

function removeByArtistaId(artistaId) {
  albumes = albumes.filter(album => album.artistaId !== Number(artistaId));
}

module.exports = {
  getAll,
  getById,
  getByArtistaId,
  save,
  remove,
  removeByArtistaId
};
