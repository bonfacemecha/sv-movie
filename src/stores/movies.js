// src/stores/movies.js
import { defineStore } from 'pinia'
import api from '../services/api' // Make sure your API instance is properly imported

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    // State for pagination
    currentPage: 1,
    totalPages: 0,
  }),

  actions: {
    // Fetch popular movies based on the current page
    async fetchPopular() {
      const token = import.meta.env.VITE_TMDB_TOKEN

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`, // Replace with your API key
        },
      }

      this.loading = true
      this.error = null // Reset the error state before making the request

      //   console.log( token);

      try {
        // const response = await api.get(`/movie/now_playing?language=en-US&page=${this.currentPage}`)
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
          options,
        )
        const data = await response.json()

        console.log(data.results)

        // Update state with response data
        this.movies = data.results
        this.currentPage = data.page
        this.totalPages = data.total_pages
      } catch (error) {
        this.error = 'Failed to fetch movies. Please try again later.' // Set a user-friendly error message
        console.error('Error fetching movies:', error)
      } finally {
        this.loading = false
      }
    },

    // Action to change page and fetch movies again
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.fetchPopular() // Refetch movies for the selected page

        // Update the URL to reflect the current page
        // Using window.history.pushState to update the URL
        window.history.pushState({}, '', `?page=${page}`)
      }
    },

    // Initialize the page number when the app is loadedd
    initializePageFromUrl() {
      const urlParams = new URLSearchParams(window.location.search)
      const pageFromUrl = parseInt(urlParams.get('page')) || 1 // Default to page 1
      this.currentPage = pageFromUrl
      this.fetchPopular()
    },
  },
})
