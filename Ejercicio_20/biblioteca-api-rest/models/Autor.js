const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema(
  {
    referencia: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    nacionalidad: {
      type: String,
      trim: true
    },
    fechaNacimiento: {
      type: Date
    },
    imagenUrl: {
      type: String,
      trim: true
    }
  },
  {
    collection: 'autores',
    timestamps: true
  }
);

module.exports = mongoose.model('Autor', autorSchema);
