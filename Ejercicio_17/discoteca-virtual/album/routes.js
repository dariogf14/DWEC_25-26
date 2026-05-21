const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', controller.list);
router.get('/form', controller.form);
router.get('/form/:id', controller.form);
router.post('/save', controller.save);
router.get('/delete/:id', controller.remove);

module.exports = router;
