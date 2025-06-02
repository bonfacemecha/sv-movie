<script setup>
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import MovieCard from '@/components/MovieCard.vue'
import { RefreshCw } from 'lucide-vue-next';


const movieStore = useMovieStore()
const { movies, loading, currentPage, totalPages, error } = storeToRefs(movieStore)
const { initializePageFromUrl, resetMovies, goToPage, searchMovies } = movieStore

const searchQuery = ref('')
const isSearchActive = ref(false)

function handleSearch() {
  isSearchActive.value = true;
  searchMovies(searchQuery.value)
}

function clearSearch() {
  searchQuery.value = ''
  isSearchActive.value = false;
  //  initializePageFromUrl()
  resetMovies()
}

// Fetch popular movies on mount
onMounted(() => {
  initializePageFromUrl()
})
</script>


<template>
  <nav class="flex mb-3 justify-end items-center" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <a href="/"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          Home
        </a>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Movies</span>
        </div>
      </li>
    </ol>
  </nav>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <RefreshCw class="animate-spin h-12 w-12 text-blue-500" />
    </div>

    <div v-else>
      <!--  Stats at a Glance -->
      <h1 class="text-2xl font-bold mb-4">Stats at a Glance</h1>
      <div class="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Current Page -->
        <div class="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-4 shadow">
          <div class="p-3 bg-blue-100 text-blue-600 rounded-full mr-4">
            <i class="fa-solid fa-solar-panel"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Current Page</p>
            <p class="text-lg font-semibold text-gray-800">{{ currentPage }}</p>
          </div>
        </div>

        <!-- Total Pages -->
        <div class="flex items-center bg-green-50 border border-green-200 rounded-lg p-4 shadow">
          <div class="p-3 bg-green-100 text-green-600 rounded-full mr-4">
            <i class="fa-solid fa-file-circle-plus"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Pages</p>
            <p class="text-lg font-semibold text-gray-800">{{ totalPages }}</p>
          </div>
        </div>

        <!-- Movies This Page -->
        <div class="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow">
          <div class="p-3 bg-yellow-100 text-yellow-600 rounded-full mr-4">
            <i class="fa-solid fa-video"></i>
          </div>
          <div>
            <p class="text-sm text-gray-500">Movies On This Page</p>
            <p class="text-lg font-semibold text-gray-800">{{ movies.length }}</p>
          </div>
        </div>
      </div>
      <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>
      <div class="mb-6 py-3 bg-gray-50 rounded-sm pl-2 shadow-sm">
        <form class="max-w-lg my-auto">
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

              <button v-if="!isSearchActive" @click="handleSearch" type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

              <button v-if="isSearchActive" @click="clearSearch" :disabled="!searchQuery" type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Clear
                Search</button>
            </div>
          </div>

        </form>
      </div>

      <div v-if="movies.length === 0" class="text-center text-gray-600 bg-gray-50 rounded-sm pl-2 shadow-sm">
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
svg.animate-spin {
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
