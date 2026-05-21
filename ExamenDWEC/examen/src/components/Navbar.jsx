import { Link, NavLink, useNavigate } from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="navbar"> 
      <nav className="navbar-links">
        <NavLink to="/">Catálogo</NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/profile">Perfil</NavLink>

            <span className="navbar-user">
              Hola, {user.nickname}
            </span>

            <button type="button" className="btn btn-secondary" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <NavLink to="/login" className="btn btn-secondary">
              Login
            </NavLink>

            <NavLink to="/register" className="btn btn-primary">
              Registro
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar