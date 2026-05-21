let artistas = require('../data/artistas.json');

function getAll() {
  return artistas;
}

function getById(id) {
  return artistas.find(artista => artista.id === Number(id));
}

function save(data) {
  const id = Number(data.id);

  const artistaData = {
    nombre: data.nombre.trim(),
    pais: data.pais.trim(),
    genero: data.genero.trim(),
    fecha_formacion: Number(data.fecha_formacion),
    foto: data.foto && data.foto.trim() ? data.foto.trim() : ''
  };

  if (id) {
    const index = artistas.findIndex(artista => artista.id === id);

    if (index !== -1) {
      artistas[index] = {
        id,
        ...artistaData
      };

      return artistas[index];
    }
  }

  const newId = artistas.length > 0
    ? Math.max(...artistas.map(artista => artista.id)) + 1
    : 1;

  const nuevoArtista = {
    id: newId,
    ...artistaData
  };

  artistas.push(nuevoArtista);
  return nuevoArtista;
}

function remove(id) {
  const numericId = Number(id);
  artistas = artistas.filter(artista => artista.id !== numericId);
}

module.exports = {
  getAll,
  getById,
  save,
  remove
};
