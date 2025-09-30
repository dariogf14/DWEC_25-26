const playlist = [
  { titulo: "NEVER ENOUGH", artista: "Turnstile", duracion: 287 },
  { titulo: "SOLE", artista: "Turnstile", duracion: 205 },
  { titulo: "I CARE", artista: "Turnstile", duracion: 233 },
  { titulo: "DREAMING", artista: "Turnstile", duracion: 156 },
  { titulo: "LIGHT DESIGN", artista: "Turnstile", duracion: 130 },
  { titulo: "DULL", artista: "Turnstile", duracion: 139 },
  { titulo: "SUNSHOWER", artista: "Turnstile", duracion: 220 },
  { titulo: "LOOK OUT FOR ME", artista: "Turnstile", duracion: 404 },
  { titulo: "CEILING", artista: "Turnstile", duracion: 73 },
  { titulo: "SEEIN' STARS", artista: "Turnstile", duracion: 186 },
  { titulo: "BIRDS", artista: "Turnstile", duracion: 146 },
  { titulo: "SLOWDIVE", artista: "Turnstile", duracion: 213 },
  { titulo: "TIME IS HAPPENING", artista: "Turnstile", duracion: 126 },
  { titulo: "MAGIC MAN", artista: "Turnstile", duracion: 193 }
];

const cancionesLargas = playlist.filter(cancion => cancion.duracion > 180);

const playlistCancionesLargas = cancionesLargas.map(cancion => `La canción ${cancion.titulo} de ${cancion.artista} dura ${cancion.duracion} segundos.`)

console.log(playlistCancionesLargas)