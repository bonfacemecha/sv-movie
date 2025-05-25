<script setup>
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'
import MovieCard from '@/components/MovieCard.vue'

const movieStore = useMovieStore()
const { movies, loading, currentPage, totalPages, error, initializePageFromUrl , fetchPopular, goToPage } = movieStore

// Fetch popular movies when component is mounted
onMounted(() => {
  // fetchPopular(),
    initializePageFromUrl()

})
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <svg class="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.6-5.6A7.96 7.96 0 0112 20a7.96 7.96 0 01-5.6-12.6A8 8 0 014 12z"></path>
      </svg>
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-6 space-x-4">
        <!-- Previous Button -->
        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>

        <!-- Page info -->
        <span class="flex items-center text-lg text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <!-- Next Button -->
        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
