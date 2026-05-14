const mongoose = require("mongoose");

const LibroSchema = new mongoose.Schema({
  referencia: { type: String, unique: true },
  titulo: { type: String, required: true },
  genero: String,
  anyoPublicacion: Number,
  autor: { type: String, required: true },
  imagenUrl: String
});

module.exports = mongoose.model("Libro", LibroSchema);