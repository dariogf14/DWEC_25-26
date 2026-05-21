const express = require('express');
const librosController = require('../controllers/librosController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await librosController.getLibros(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await librosController.getLibroById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await librosController.createLibro(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await librosController.updateLibro(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await librosController.deleteLibro(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
