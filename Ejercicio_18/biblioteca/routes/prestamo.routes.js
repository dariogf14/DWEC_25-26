const router = require("express").Router();
const ctrl = require("../controllers/prestamo.controller");

router.get("/prestamo/formulario/:libro_id", ctrl.formulario);
router.post("/prestamo/nuevo", ctrl.nuevo);
router.post("/prestamo/devolver/:libro_id", ctrl.devolver);

router.get("/prestamos/usuario", ctrl.porUsuario);

module.exports = router;