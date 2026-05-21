import { useEffect, useState } from 'react'

function Home() {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    platform: '',
    sort: 'recent'
  })

  async function loadSeries(currentFilters = filters) {
    try {
      setLoading(true)
      setError('')

      const data = await getSeries(currentFilters)
      setSeries(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSeries()
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
    loadSeries(filters)
  }

  function handleReset() {
    const emptyFilters = {
      search: '',
      genre: '',
      platform: '',
      sort: 'recent'
    }

    setFilters(emptyFilters)
    loadSeries(emptyFilters)
  }

  return (
    <section className="page">
      <div className="hero">
        <div>
          <h1>Catálogo local</h1>
        </div>
      </div>

      <form className="filters-panel" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Buscar serie"
          value={filters.search}
          onChange={handleChange}
        />

        <div className="filters-actions">
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>

        </div>
      </form>

      <section className="section-heading">
        <h2>Catálogo</h2>
        <p>{series.length} series</p>
      </section>

      {loading && (
        <div className="empty-state">
          <h2>Cargando series...</h2>
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