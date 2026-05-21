import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <article className="game-card">
      <div className="game-card-cover">
        {game.cover ? (
          <img src={serie.cover} alt={`Portada de ${game.title}`} />
        ) : (
          <span>{game.title.charAt(0)}</span>
        )}
      </div>

      <div className="game-card-content">
        <div className="game-card-header">
          <h3>{game.title}</h3>
          <span className="rating">{game.average_rating ?? '—'}</span>
        </div>

        <p className="game-meta">
          {game.genre} · {game.platform} · {game.release_year}
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