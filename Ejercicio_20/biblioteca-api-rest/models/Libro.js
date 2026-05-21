const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema(
  {
    referencia: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    genero: {
      type: String,
      trim: true
    },
    anyoPublicacion: {
      type: Number
    },
    autor: {
      type: String,
      required: true,
      trim: true
    },
    imagenUrl: {
      type: String,
      trim: true
    }
  },
  {
    collection: 'libros',
    timestamps: true
  }
);

module.exports = mongoose.model('Libro', libroSchema);
