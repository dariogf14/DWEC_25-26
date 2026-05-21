const mongoose = require('mongoose');
require('dotenv').config();

const Autor = require('../models/Autor');
const Libro = require('../models/Libro');
const autores = require('../data/autores.json');
const libros = require('../data/libros.json');

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Falta MONGODB_URI en .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    await Autor.deleteMany({});
    await Libro.deleteMany({});

    await Autor.insertMany(autores);
    await Libro.insertMany(libros);

    console.log('Datos insertados correctamente en MongoDB');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
