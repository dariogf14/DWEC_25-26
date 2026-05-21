const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('Falta la variable MONGODB_URI');
    }

    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando con MongoDB:', error.message);
  }
}

module.exports = connectDB;
