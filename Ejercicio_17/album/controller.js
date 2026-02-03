const albumModel = require('./model');
const artistaModel = require('../artista/model');


exports.list = (req, res) => {
    const albumes = albumModel.getAll().map(a => ({
        ...a,
        artista: artistaModel.getById(a.artistaId)
    }));
    res.render('album/list', { albumes });
};


exports.form = (req, res) => {
    const album = req.params.id ? albumModel.getById(req.params.id) : {};
    const artistas = artistaModel.getAll();
    res.render('album/form', { album, artistas, error: null });
};


exports.save = (req, res) => {
    const { titulo, anio } = req.body;


    if (!titulo || !anio) {
        return res.render('album/form', {
            album: req.body,
            artistas: artistaModel.getAll(),
            error: 'Título y año obligatorios'
        });
    }


    albumModel.save({
        id: req.body.id || null,
        titulo,
        anio,
        artistaId: req.body.artistaId,
        foto: req.body.foto
    });


    res.redirect('/albumes');
};


exports.delete = (req, res) => {
    albumModel.remove(req.params.id);
    res.redirect('/albumes');
};