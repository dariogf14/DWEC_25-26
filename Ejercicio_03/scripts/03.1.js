// ejercicio-01.js

// Definimos la lista de reproducción como un arreglo de objetos
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

// Usamos forEach para imprimir el título y artista de cada canción
playlist.forEach(cancion => {
  console.log(`🎵 ${cancion.titulo} - ${cancion.artista}`);
});