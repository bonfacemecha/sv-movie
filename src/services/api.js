// src/services/api.js
const BASE_URL = 'https://api.themoviedb.org/3'
const token = import.meta.env.VITE_TMDB_TOKEN

export default {
  async get(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`)

    // Append query params dynamically
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.status_message || 'API Error')
    }

    return response.json()
  },
}
