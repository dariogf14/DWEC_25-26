const express = require('express');
const libroController = require('../controllers/libroController');

const router = express.Router();

router.get('/', libroController.catalogo);
router.get('/prestados', libroController.prestados);
router.get('/prestamos/usuario', libroController.prestamosUsuario);
router.get('/vencidos', libroController.vencidos);
router.get('/libro/:id', libroController.detalleLibro);

module.exports = router;
