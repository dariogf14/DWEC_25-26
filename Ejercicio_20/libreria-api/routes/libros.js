const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");


// GET libros (ordenación)
router.get("/", async (req, res) => {
  try {
    let query = Libro.find();

    if (req.query.sort === "titulo") {
      query = query.sort({ titulo: 1 });
    }

    const libros = await query;
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET libro por ID
router.get("/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    res.json(libro);
  } catch (error) {
    res.status(404).json({ error: "Libro no encontrado" });
  }
});


// POST crear libro
router.post("/", async (req, res) => {
  try {
    const nuevoLibro = new Libro(req.body);
    const libro = await nuevoLibro.save();
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// PUT actualizar
router.put("/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Libro eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;