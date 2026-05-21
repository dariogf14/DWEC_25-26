import { Link } from 'react-router-dom'

function GameCard({ serie }) {
  return (
    <article className="serie-card">
      <div className="serie-card-cover">
        {serie.cover ? (
          <img src={serie.cover} alt={`Portada de ${serie.title}`} />
        ) : (
          <span>{serie.title.charAt(0)}</span>
        )}
      </div>

      <div className="serie-card-content">
        <div className="serie-card-header">
          <h3>{serie.title}</h3>
          <span className="rating">{serie.average_rating ?? '—'}</span>
        </div>

        <p className="serie-meta">
          {serie.genre} · {serie.release_year}
        </p>

        <p className="game-description">{game.description}</p>

        <Link to={`/games/${game.id}`} className="card-link">
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default GameCard