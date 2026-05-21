const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const albumRoutes = require('./album/routes');
const artistaRoutes = require('./artista/routes');

const app = express();

// Vistas y motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos y formularios
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Morgan.
// En local escribe en access.log. En Vercel se usa consola para evitar problemas de escritura.
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
  app.use(morgan('combined', { stream: accessLogStream }));
}

// Rutas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Discoteca Virtual'
  });
});

app.use('/albumes', albumRoutes);
app.use('/album', albumRoutes);

app.use('/artistas', artistaRoutes);
app.use('/artista', artistaRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página no encontrada',
    mensaje: 'La página solicitada no existe.'
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor disponible en http://localhost:${PORT}`);
  });
}

module.exports = app;
