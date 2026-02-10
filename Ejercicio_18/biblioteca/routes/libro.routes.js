const router = require("express").Router();
const ctrl = require("../controllers/libro.controller");

router.get("/libro/:id", ctrl.detalle);

module.exports = router;