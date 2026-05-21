import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Acceso</span>
        <h1>Iniciar sesión</h1>
        <p>Entra en tu cuenta para publicar reseñas y puntuar series.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="usuario@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </section>
  )
}

export default Login