<template>
   <router-link :to="`/movie/${movie.id}`" class="block">
  <div 
    class="cursor-pointer movie-card shadow-md rounded-lg overflow-hidden bg-white hover:shadow-xl transition duration-300"
  >
    <img
      :src="getPosterUrl(movie.poster_path)"
      :alt="movie.title"
      class="w-full h-64 object-cover"
    />
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ movie.title }}</h2>
      <p class="text-sm text-gray-500 mb-2">Release Date: {{ movie.release_date }}</p>
      <p class="text-sm text-gray-600 line-clamp-3">{{ movie.overview }}</p>
      <div class="flex justify-between items-center mt-4">
        <span class="text-yellow-600 font-bold">⭐ {{ movie.vote_average.toFixed(1) }}</span>
        <span class="text-xs text-gray-400">Votes: {{ movie.vote_count }}</span>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()



const goToDetail = (movieId) => {
  router.push(`/movie/${movieId}`)
}

defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const getPosterUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
}
</script>

<style scoped>
/* Optional: Clamp lines for overview */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
