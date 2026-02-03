let albumes = require('../data/albumes.json');


const getAll = () => albumes;
const getById = id => albumes.find(a => a.id == id);
const getByArtista = artistaId => albumes.filter(a => a.artistaId == artistaId);


const save = album => {
    if (album.id) {
        const i = albumes.findIndex(a => a.id == album.id);
        albumes[i] = album;
    } else {
        album.id = Date.now();
        albumes.push(album);
    }
};


const remove = id => {
    albumes = albumes.filter(a => a.id != id);
};


module.exports = { getAll, getById, getByArtista, save, remove };