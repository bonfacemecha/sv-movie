<script setup>
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import MovieCard from '@/components/MovieCard.vue'
import { useUserStore } from '@/stores/useUserStore';
import { ChevronRight } from 'lucide-vue-next';


// Access the user store
const userStore = useUserStore()

// Access user from store
const user = userStore.user

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

const getFirstName = (name) => {
  if (!name) return ''; 
  
  return name.split(' ')[0];
  }
</script>


<template>

<nav class="flex mb-3 justify-end items-center" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li class="inline-flex items-center">
      <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li aria-current="page">
      <div class="flex items-center">
        <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Dashboard</span>
      </div>
    </li>
  </ol>
</nav>



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

    <div v-else class="pb-6">
      <!--  Stats at a Glance -->
      <div class="">
        <div class="text mb-8">
              <p v-if="user && user.displayName">Hi {{ getFirstName(user.displayName) }} 👋</p>

          <h1 class="text-2xl font-bold mb-4">Welcome Back</h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-full bg-gray-50 py-8 px-3 rounded-sm">
          <!-- Movies Card -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <i class="fas fa-film text-4xl text-blue-600 mb-4"></i>
            <h2 class="text-xl font-medium text-gray-800 mb-4">Movies</h2>
            <router-link to="/movies">
              <button class="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700 transition-all">
                Go to Movies
              </button>
            </router-link>
          </div>

          <!-- Favorites Card -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <i class="fas fa-star text-4xl text-yellow-500 mb-4"></i>
            <h2 class="text-xl font-medium text-gray-800 mb-4">Favorites</h2>
            <router-link to="#">
              <button
                class="bg-yellow-500 text-white px-6 py-2 rounded-full text-lg hover:bg-yellow-600 transition-all">
                View Favorites
              </button>
            </router-link>
          </div>

          <!-- Search Card -->
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
            <i class="fas fa-search text-4xl text-green-500 mb-4"></i>
            <h2 class="text-xl font-medium text-gray-800 mb-4">Search</h2>
            <router-link to="/movies">
              <button class="bg-green-500 text-white px-6 py-2 rounded-full text-lg hover:bg-green-600 transition-all">
                Search Movies
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <h1 class="text-2xl font-bold my-8">Featured Movies</h1>


      <div v-if="movies.length === 0" class="text-center text-gray-600 bg-gray-50 rounded-sm pl-2 shadow-sm">
        No movies found.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard v-for="movie in movies.slice(0, 4)" :key="movie.id" :movie="movie" />
      </div>

      <!-- Search Button (below cards) -->
      <div class="mt-8 text-center">
        <router-link to="/search">
          <button class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-all">
            Start Searching Movies
          </button>
        </router-link>
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
