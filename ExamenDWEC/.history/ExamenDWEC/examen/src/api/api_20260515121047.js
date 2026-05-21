const API_URL = 'http://localhost:8000/api'

export async function getSeries(filters = {}) {
  const params = new URLSearchParams()

  if (filters.search) {
    params.append('search', filters.search)
  }

  if (filters.platform) {
    params.append('platform', filters.platform)
  }

  const queryString = params.toString()
  const url = queryString ? `${API_URL}/series?${queryString}` : `${API_URL}/series`

  const response = await fetch(url, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error al obtener las series')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.message || 'Error desconocido')
  }

  return result.data
}

export async function getSerieById(id) {
  const response = await fetch(`${API_URL}/series/${id}`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error al obtener el videojuego')
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.message || 'Error desconocido')
  }

  return result.data
}

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(userData)
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al registrar usuario')
  }

  return result
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(credentials)
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al iniciar sesión')
  }

  return result.data
}

export async function getMe() {
  const response = await fetch(`${API_URL}/me`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    return null
  }

  return result.data
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al cerrar sesión')
  }

  return result
}

export async function getMyReview(serieId) {
  const response = await fetch(`${API_URL}/series/${serieId}/my-review`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (response.status === 401) {
    return null
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al obtener tu reseña')
  }

  return result.data
}

export async function createReview(serieId, reviewData) {
  const response = await fetch(`${API_URL}/series/${serieId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(reviewData)
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al añadir la reseña')
  }

  return result
}

export async function getMyProfile() {
  const response = await fetch(`${API_URL}/me/profile`, {
    credentials: 'include'
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Error al obtener el perfil')
  }

  return result.data
}