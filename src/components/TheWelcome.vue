<script setup>
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import MovieCard from '@/components/MovieCard.vue'

const movieStore = useMovieStore()
const { movies, loading, currentPage, totalPages, error } = storeToRefs(movieStore)
const { initializePageFromUrl, resetMovies, goToPage, searchMovies } = movieStore

const searchQuery = ref('')

function handleSearch() {
  searchMovies(searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  //  initializePageFromUrl()
  resetMovies()
}

// Fetch popular movies on mount
onMounted(() => {
  initializePageFromUrl()
})
</script>


<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <svg class="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 0115.6-5.6A7.96 7.96 0 0112 20a7.96 7.96 0 01-5.6-12.6A8 8 0 014 12z"></path>
      </svg>
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>
      <div class="mb-6 py-3 bg-gray-50">
        <form class="max-w-lg mx-auto">
          <div class="search-b">
            <label for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i class="fa-solid fa-magnifying-glass w-4 h-4 text-gray-500 dark:text-gray-400"></i>
            </div>
            <input v-model="searchQuery" @keyup.enter="handleSearch" type="search" id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Movie..." required />
            <button @click="handleSearch" type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          
            </div>
          </div>
            <button v-if="searchQuery"
              @click="clearSearch"
              :disabled="!searchQuery"
              class="px-4 mt-2 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Clear Search
            </button>
        </form>
      </div>

      <div v-if="movies.length === 0" class="text-center text-gray-600">
        No movies found.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Previous Button -->
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
          Previous
        </button>

        <!-- Page info -->
        <span class="flex items-center text-lg text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <!-- Next Button -->
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Center the loading spinner vertically and horizontally */
svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button:disabled {
  cursor: not-allowed;
}
</style>
