const express = require("express");
const router = express.Router();
const Autor = require("../models/Autor");
const Libro = require("../models/Libro");


// GET autores (con filtro)
router.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.nacionalidad) {
      filtro.nacionalidad = req.query.nacionalidad;
    }

    const autores = await Autor.find(filtro);
    res.json(autores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET autor por ID
router.get("/:id", async (req, res) => {
  try {
    const autor = await Autor.findById(req.params.id);
    res.json(autor);
  } catch (error) {
    res.status(404).json({ error: "Autor no encontrado" });
  }
});


// POST crear autor
router.post("/", async (req, res) => {
  try {
    const nuevoAutor = new Autor(req.body);
    const autor = await nuevoAutor.save();
    res.status(201).json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// PUT actualizar
router.put("/:id", async (req, res) => {
  try {
    const autor = await Autor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(autor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Autor.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Autor eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET libros de un autor
router.get("/:id/libros", async (req, res) => {
  try {
    const libros = await Libro.find({ autor: req.params.id });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;