let artistas = require('../data/artistas.json');


const getAll = () => artistas;
const getById = id => artistas.find(a => a.id == id);


const save = artista => {
    if (artista.id) {
        const i = artistas.findIndex(a => a.id == artista.id);
        artistas[i] = artista;
    } else {
        artista.id = Date.now();
        artistas.push(artista);
    }
};


const remove = id => {
    artistas = artistas.filter(a => a.id != id);
};


module.exports = { getAll, getById, save, remove };