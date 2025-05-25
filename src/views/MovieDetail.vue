<!-- src/views/MovieDetail.vue -->
 <script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'


const route = useRoute()
const movieStore = useMovieStore()

// Destructure reactive state values
const {loading, relatedMovies, movie } = storeToRefs(movieStore)


// Fetch popular movies on mount
onMounted(() => {
  const id = route.params.id
  movieStore.fetchMovieDetails(id)
})

watch(() => route.params.id, (newId) => {
   movieStore.fetchMovieDetails(newId)
})

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">

     <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <svg
        class="animate-spin h-12 w-12 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0115.6-5.6A7.96 7.96 0 0112 20a7.96 7.96 0 01-5.6-12.6A8 8 0 014 12z"
        ></path>
      </svg>
    </div>
<div v-else>
    <!-- Movie Header -->
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Poster Image -->
       <!-- {{ movie }} -->
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="w-full md:w-1/3 rounded-lg shadow-lg"
      />

      <!-- Movie Info -->
      <div class="flex-1">
        <h1 class="text-3xl font-bold mb-2">{{ movie.title }}</h1>
        <p class="text-gray-500 italic mb-4">{{ movie.tagline }}</p>

        <div class="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div class="flex items-center gap-1">
            <i class="fa-solid fa-clock"></i>
            <span>{{ movie.runtime }} mins</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fa-solid fa-calendar-days"></i>
            <span>{{ movie.release_date }}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fa-solid fa-language"></i>
            <span>{{ movie.original_language }}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fa-solid fa-globe"></i>
            <span v-for="country in movie.origin_country" :key="country">{{ country }}</span>
          </div>
        </div>

        <div class="mb-4">
          <span class="font-semibold">Genres:</span>
          <span  v-for="genre in movie.genres" :key="genre.id" class="ml-2 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">
            {{ genre.name }}
          </span>
        </div>

        <p class="text-gray-800 mb-6">{{ movie.overview }}</p>

        <div class="mb-2">
          <span class="font-semibold">Production:</span>
          <ul class="list-disc ml-5 mt-1 text-sm text-gray-700">
            <li v-for="company in movie.production_companies" :key="company.id">
              {{ company.name }}
            </li>
          </ul>
        </div>

        <div class="mb-2">
          <span class="font-semibold">Languages:</span>
          <span class="ml-1" v-for="lang in movie.spoken_languages" :key="lang.iso_639_1">
            {{ lang.english_name }}
          </span>
        </div>

        <div class="mt-4">
          <a
            :href="movie.homepage"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
          >
            Visit Homepage
            <i class="fa-solid fa-arrow-up-right-from-square ml-2 text-sm"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- You May Like Section -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Movies You May Like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard
          v-for="related in relatedMovies"
          :key="related.id"
          :movie="related"
        />
      </div>
    </div>
</div>
  </div>
</template>


