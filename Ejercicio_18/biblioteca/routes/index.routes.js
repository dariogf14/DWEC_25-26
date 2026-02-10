const router = require("express").Router();
const ctrl = require("../controllers/index.controller");

router.get("/", ctrl.catalogo);
router.get("/prestados", ctrl.prestados);
router.get("/vencidos", ctrl.vencidos);

module.exports = router;