const mongoose = require("mongoose");

const AutorSchema = new mongoose.Schema({
  referencia: String,
  nombre: String,
  nacionalidad: String,
  fechaNacimiento: Date,
  imagenUrl: String
});

module.exports = mongoose.model("Autor", AutorSchema, "autores");