import { useEffect, useState } from 'react'
import { getGames } from '../api/api'

function Home() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    platform: '',
    sort: 'recent'
  })

  async function loadGames(currentFilters = filters) {
    try {
      setLoading(true)
      setError('')

      const data = await getGames(currentFilters)
      setGames(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGames()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFilters({
      ...filters,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    loadGames(filters)
  }

  function handleReset() {
    const emptyFilters = {
      search: '',
      genre: '',
      platform: '',
      sort: 'recent'
    }

    setFilters(emptyFilters)
    loadGames(emptyFilters)
  }

  return (
    <section className="page">
      <div className="hero">
        <div>
          <h1>Descubre, valora y reseña videojuegos</h1>
          <p>
            Plataforma web para consultar fichas de videojuegos, publicar reseñas,
            puntuar títulos y organizar tu historial de juego.
          </p>
        </div>
      </div>

      <form className="filters-panel" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Buscar videojuego..."
          value={filters.search}
          onChange={handleChange}
        />

        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
        >
          <option value="">Todos los géneros</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG de acción">RPG de acción</option>
          <option value="Acción/Aventura">Acción/Aventura</option>
          <option value="Sandbox">Sandbox</option>
          <option value="Metroidvania">Metroidvania</option>
        </select>

        <select
          name="platform"
          value={filters.platform}
          onChange={handleChange}
        >
          <option value="">Todas las plataformas</option>
          <option value="PC">PC</option>
          <option value="PlayStation">PlayStation</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Multiplataforma">Multiplataforma</option>
        </select>

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="recent">Más recientes</option>
          <option value="rating">Mejor valorados</option>
          <option value="title">Título A-Z</option>
          <option value="year">Año de lanzamiento</option>
        </select>

        <div className="filters-actions">
          <button type="submit" className="btn btn-primary">
            Aplicar filtros
          </button>

          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>

      <section className="section-heading">
        <h2>Catálogo de videojuegos</h2>
        <p>{games.length} videojuegos</p>
      </section>

      {loading && (
        <div className="empty-state">
          <h2>Cargando videojuegos...</h2>
        </div>
      )}

      {error && (
        <div className="empty-state">
          <h2>Error al cargar videojuegos</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="empty-state">
          <h2>No se encontraron videojuegos</h2>
          <p>Prueba con otra búsqueda o limpia los filtros.</p>
        </div>
      )}

      {!loading && !error && games.length > 0 && (
        <section className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </section>
      )}
    </section>
  )
}

export default Home