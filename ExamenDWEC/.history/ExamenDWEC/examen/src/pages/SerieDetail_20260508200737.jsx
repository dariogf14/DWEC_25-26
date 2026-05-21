import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  getGameById,
  getGameReviews,
  getMyReview,
  createReview,
  updateReview,
  deleteReview,
  setFavoriteGame
} from '../api/api'
import { useAuth } from '../context/AuthContext'

function GameDetail() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()

  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const [game, setGame] = useState(null)
  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null)

  const [rating, setRating] = useState('10')
  const [content, setContent] = useState('')

  const [loading, setLoading] = useState(true)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [error, setError] = useState('')
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState('')

  const [isEditingReview, setIsEditingReview] = useState(false)
  const [editRating, setEditRating] = useState('10')
  const [editContent, setEditContent] = useState('')

  async function loadGameData() {
    try {
      setLoading(true)
      setError('')

      const gameData = await getGameById(id)
      const reviewsData = await getGameReviews(id)

      setGame(gameData)
      setReviews(reviewsData)
      setIsFavorite(Boolean(gameData.is_favorite))
      
      if (isAuthenticated) {
        const myReviewData = await getMyReview(id)
        setMyReview(myReviewData)
      } else {
        setMyReview(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGameData()
  }, [id, isAuthenticated])

  async function handleSubmitReview(event) {
    event.preventDefault()

    setReviewError('')
    setReviewSuccess('')
    setReviewLoading(true)

    try {
      await createReview(id, {
        rating: Number(rating),
        content
      })

      setContent('')
      setRating('10')
      setReviewSuccess('Reseña publicada correctamente.')

      await loadGameData()
    } catch (err) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  async function handleToggleFavoriteGame() {
    if (!isAuthenticated) {
      return
    }

    setFavoriteLoading(true)

    try {
      if (isFavorite) {
        await setFavoriteGame(null)
        setIsFavorite(false)
      } else {
        await setFavoriteGame(game.id)
        setIsFavorite(true)
      }
    } catch (err) {
      console.error(err.message)
    } finally {
      setFavoriteLoading(false)
    }
  }

  function startEditReview() {
    setIsEditingReview(true)
    setEditRating(String(myReview.rating))
    setEditContent(myReview.content)
    setReviewError('')
    setReviewSuccess('')
  }

  function cancelEditReview() {
    setIsEditingReview(false)
    setEditRating('10')
    setEditContent('')
    setReviewError('')
    setReviewSuccess('')
  }

  async function handleUpdateReview(event) {
    event.preventDefault()

    setReviewError('')
    setReviewSuccess('')
    setReviewLoading(true)

    try {
      await updateReview(myReview.id, {
        rating: Number(editRating),
        content: editContent
      })

      setReviewSuccess('Reseña actualizada correctamente.')
      setIsEditingReview(false)

      await loadGameData()
    } catch (err) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  async function handleDeleteReview() {
    const confirmed = window.confirm('¿Seguro que quieres eliminar esta reseña?')

    if (!confirmed) {
      return
    }

    setReviewError('')
    setReviewSuccess('')
    setReviewLoading(true)

    try {
      await deleteReview(myReview.id)

      setReviewSuccess('Reseña eliminada correctamente.')
      setMyReview(null)

      await loadGameData()
    } catch (err) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="page">
        <div className="empty-state">
          <h1>Cargando videojuego...</h1>
        </div>
      </section>
    )
  }

  if (error || !game) {
    return (
      <section className="page">
        <div className="empty-state">
          <h1>Videojuego no encontrado</h1>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="game-detail-page">
      <Link to="/" className="back-link">
        ← Volver al catálogo
      </Link>

      <section
        className="lb-hero"
        style={{ backgroundImage: game.cover ? `url(${game.cover})` : undefined }}
      >
        <div className="lb-hero-overlay"></div>
      </section>

      <section className="lb-detail-content">
        <aside className="lb-poster-column">
          <div className="lb-poster">
            {game.cover ? (
              <img src={game.cover} alt={`Portada de ${game.title}`} />
            ) : (
              <span>{game.title.charAt(0)}</span>
            )}
          </div>

          <div className="lb-poster-stats">
            <span>⭐ {game.average_rating ?? '—'}</span>
            <span>💬 {game.reviews_count} reseñas</span>
          </div>
        </aside>

        <div className="lb-info-column">
          <div className="lb-title-row">
            <div>
              <h1>{game.title}</h1>
              <p>
                {game.release_year} · {game.genre} · {game.platform}
              </p>
            </div>

            <div className="lb-score">
              <strong>{game.average_rating ?? '—'}</strong>
              <span>Media</span>
            </div>
          </div>

          <p className="lb-tagline">
            Descubre, valora y comparte tu experiencia con este videojuego.
          </p>

          <p className="lb-description">
            {game.description}
          </p>

          <div className="lb-actions">
            <a href="#review-form" className="btn btn-primary">
              Escribir reseña
            </a>

            <button
              type="button"
              className={isFavorite ? 'btn btn-favorite' : 'btn btn-secondary'}
              onClick={handleToggleFavoriteGame}
              disabled={favoriteLoading || !isAuthenticated}
            >
              {favoriteLoading ? 'Guardando...' : isFavorite ? 'Favorito' : 'Marcar como favorito'}
            </button>
          </div>

        </div>
      </section>

      <section className="reviews-section" id="review-form">
        <div className="section-heading">
          <div>
            <h2>Tu reseña</h2>
            <p>Tu valoración personal para este videojuego</p>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="empty-state">
            <h2>Inicia sesión para publicar una reseña</h2>
            <p>Necesitas una cuenta para valorar videojuegos.</p>
            <Link to="/login" className="btn btn-primary">
              Iniciar sesión
            </Link>
          </div>
        )}

        {isAuthenticated && myReview && !isEditingReview && (
          <article className="review-card user-review-card">
            {reviewError && <div className="alert alert-error">{reviewError}</div>}
            {reviewSuccess && <div className="alert alert-success">{reviewSuccess}</div>}

            <div>
              <strong>Tú</strong>
              <span>{myReview.rating}/10</span>
            </div>

            <p>{myReview.content}</p>

            <div className="review-actions">
              <button
                type="button"
                className="table-btn"
                onClick={startEditReview}
              >
                Editar reseña
              </button>

              <button
                type="button"
                className="table-btn danger"
                onClick={handleDeleteReview}
                disabled={reviewLoading}
              >
                {reviewLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </article>
        )}

        {isAuthenticated && myReview && isEditingReview && (
          <form className="review-form" onSubmit={handleUpdateReview}>
            {reviewError && <div className="alert alert-error">{reviewError}</div>}
            {reviewSuccess && <div className="alert alert-success">{reviewSuccess}</div>}

            <div className="review-form-top">
              <label className="review-form-field review-form-score">
                <span>Puntuación</span>
                <select
                  value={editRating}
                  onChange={(event) => setEditRating(event.target.value)}
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>

            <label className="review-form-field">
              <span>Reseña</span>
              <textarea
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
              />
            </label>

            <div className="review-form-footer review-form-footer-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEditReview}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={reviewLoading}
              >
                {reviewLoading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        )}

        {isAuthenticated && !myReview && (
          <form className="review-form" onSubmit={handleSubmitReview}>
            {reviewError && <div className="alert alert-error">{reviewError}</div>}
            {reviewSuccess && <div className="alert alert-success">{reviewSuccess}</div>}

            <div className="review-form-top">
              <label className="review-form-field review-form-score">
                <span>Puntuación</span>
                <select
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                >
                  <option value="10">10</option>
                  <option value="9">9</option>
                  <option value="8">8</option>
                  <option value="7">7</option>
                  <option value="6">6</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>

            <label className="review-form-field">
              <span>Reseña</span>
              <textarea
                placeholder="Escribe tu opinión sobre el videojuego..."
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </label>

            <div className="review-form-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={reviewLoading}
              >
                {reviewLoading ? 'Publicando...' : 'Publicar reseña'}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="reviews-section">
        <div className="section-heading">
          <div>
            <h2>Reseñas de usuarios</h2>
            <p>Opiniones publicadas por otros jugadores</p>
          </div>
        </div>

        {reviews.length === 0 && (
          <div className="empty-state">
            <h2>Todavía no hay reseñas</h2>
            <p>Sé el primero en publicar una opinión sobre este videojuego.</p>
          </div>
        )}

        {reviews.map((review) => (
          <article className="review-card" key={review.id}>
            <div>
              <strong>{review.nickname}</strong>
              <span>{review.rating}/10</span>
            </div>

            <p>{review.content}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default GameDetail