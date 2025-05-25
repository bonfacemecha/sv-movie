// src/services/api.js
import axios from 'axios'

const token = import.meta.env.VITE_TMDB_TOKEN

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // Or your movie API URL
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

export default apiClient

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmM0NTQwZjAwM2I1MGM5MTNmMDY3MGFmOTkzYzMyZSIsIm5iZiI6MTc0ODE1NTI1OC40NCwic3ViIjoiNjgzMmJiN2E3NGJmOGFlNTNmMmI2ZDEwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.6Em6fiJyceMf7ZXquh5ZVl1OOxwGOSWux3PVGZYuAnY',
  },
}

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
