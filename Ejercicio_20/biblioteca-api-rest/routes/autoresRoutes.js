const express = require('express');
const autoresController = require('../controllers/autoresController');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await autoresController.getAutores(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/libros', async (req, res, next) => {
  try {
    await autoresController.getLibrosByAutor(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await autoresController.getAutorById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await autoresController.createAutor(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await autoresController.updateAutor(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await autoresController.deleteAutor(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
