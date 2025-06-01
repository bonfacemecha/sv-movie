// src/stores/movies.js
import { defineStore } from 'pinia'
import api from '../services/api'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    movie: {},
    relatedMovies: [],
    currentPage: 1,
    totalPages: 0,
  }),

  actions: {
    async fetchPopular() {
      this.loading = true
      this.error = null

      try {
        const data = await api.get('/movie/now_playing', {
          language: 'en-US',
          page: this.currentPage,
        })

        this.movies = data.results
        this.currentPage = data.page
        this.totalPages = data.total_pages
      } catch (error) {
        this.error = 'Failed to fetch movies. Please try again later.'
        console.error('Error fetching movies:', error)
      } finally {
        this.loading = false
      }
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.fetchPopular()

        // Update the URL without reloading the page
        window.history.pushState({}, '', `?page=${page}`)

        // Delay scroll to top to ensure content has been loaded
        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
      }
    },

    initializePageFromUrl() {
      const urlParams = new URLSearchParams(window.location.search)
      const pageFromUrl = parseInt(urlParams.get('page')) || 1
      this.currentPage = pageFromUrl
      this.fetchPopular()
    },
    async fetchMovieDetails(id) {
      this.loading = true

      try {
        const [movieRes, similarRes] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/similar`),
        ])
        this.movie = movieRes
        this.relatedMovies = similarRes.results
        document.title = `${this.movie.title} | Movie App`
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        this.loading = false
      }
    },

    // Inside actions in useMovieStore
    async searchMovies(query) {
      if (!query) {
        // If search is cleared, fallback to popular
        return this.fetchPopular()
      }

      this.loading = true
      this.error = null

      try {
        const data = await api.get('/search/movie', {
          query,
          language: 'en-US',
          page: 1,
        })

        this.movies = data.results
        this.currentPage = data.page
        this.totalPages = data.total_pages
      } catch (error) {
        this.error = 'Search failed. Please try again.'
        console.error('Error searching movies:', error)
      } finally {
        this.loading = false
      }
    },
    resetMovies() {
      this.fetchPopular()
    },
  },
})
