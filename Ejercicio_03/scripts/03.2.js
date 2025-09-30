// ejercicio-02.js

// Reutilizamos la misma playlist del ejercicio anterior
const playlist = [
  { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
  { titulo: "Billie Jean", artista: "Michael Jackson", duracion: 294 },
  { titulo: "Imagine", artista: "John Lennon", duracion: 183 },
  { titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: 301 },
  { titulo: "Shape of You", artista: "Ed Sheeran", duracion: 263 },
  { titulo: "Hotel California", artista: "Eagles", duracion: 391 },
  { titulo: "Blinding Lights", artista: "The Weeknd", duracion: 200 },
  { titulo: "Stairway to Heaven", artista: "Led Zeppelin", duracion: 482 },
  { titulo: "Rolling in the Deep", artista: "Adele", duracion: 228 },
  { titulo: "Uptown Funk", artista: "Mark Ronson ft. Bruno Mars", duracion: 269 }
];

// 1. Filtrar canciones que duren más de 180 segundos
const cancionesLargas = playlist.filter(cancion => cancion.duracion > 180);

// 2. Mapear para crear mensajes descriptivos
const mensajes = cancionesLargas.map(cancion => 
  `La canción ‘${cancion.titulo}’ de ${cancion.artista} dura ${cancion.duracion} segundos.`
);

// 3. Imprimir en consola
console.log(mensajes);