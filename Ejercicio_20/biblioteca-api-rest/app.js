const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const autoresRoutes = require('./routes/autoresRoutes');
const librosRoutes = require('./routes/librosRoutes');

const app = express();

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
}

app.get('/', (req, res) => {
  res.json({
    message: 'API REST Biblioteca',
    endpoints: {
      autores: '/api/autores',
      libros: '/api/libros'
    }
  });
});

app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
}

module.exports = app;
