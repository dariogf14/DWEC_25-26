const express = require('express');
const multer = require('multer');
const alumnoController = require('../controllers/alumnoController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Solo se permiten imágenes'));
    }
    callback(null, true);
  }
});

router.get('/', alumnoController.index);
router.post('/alumnos', upload.single('imagen'), alumnoController.create);
router.post('/alumnos/delete/:id', alumnoController.remove);
router.get('/imagen/:fileName', alumnoController.showImage);

module.exports = router;
