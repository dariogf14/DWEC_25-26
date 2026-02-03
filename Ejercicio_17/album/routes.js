const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/', controller.list);
router.get('/form', controller.form);
router.get('/form/:id', controller.form);
router.post('/save', controller.save);
router.get('/delete/:id', controller.delete);


module.exports = router;