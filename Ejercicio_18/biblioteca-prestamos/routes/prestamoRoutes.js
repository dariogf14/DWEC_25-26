const express = require('express');
const prestamoController = require('../controllers/prestamoController');

const router = express.Router();

router.get('/formulario/:libro_id', prestamoController.formularioPrestamo);
router.post('/nuevo', prestamoController.nuevoPrestamo);
router.get('/devolver/:libro_id', prestamoController.devolverLibro);

module.exports = router;
