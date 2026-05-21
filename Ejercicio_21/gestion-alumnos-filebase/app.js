const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config();

const alumnoRoutes = require('./routes/alumnoRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
}

app.use('/', alumnoRoutes);

app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    message: 'La ruta solicitada no existe.'
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('error', {
    title: 'Error interno',
    message: 'Ha ocurrido un error al procesar la petición. Revisa RDS/Filebase y las variables de entorno.'
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
}

module.exports = app;
