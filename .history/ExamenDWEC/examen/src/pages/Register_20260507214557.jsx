import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    setSuccess('')
    setLoading(true)

    try {
      await register(formData)
      setSuccess('Cuenta creada correctamente. Ya puedes iniciar sesión.')

      setTimeout(() => {
        navigate('/login')
      }, 900)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Nueva cuenta</span>
        <h1>Crear cuenta</h1>
        <p>Regístrate para valorar videojuegos y guardar tu actividad.</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nickname
            <input
              type="text"
              name="nickname"
              placeholder="Tu nombre de usuario"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>

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
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </section>
  )
}

export default Register