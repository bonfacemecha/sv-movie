<!-- src/views/AboutUs.vue -->

<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          About Us
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          We are passionate movie lovers on a mission to bring you the best movie experience.
        </p>
      </div>

      <!-- Content Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Section -->
        <div class="space-y-6">
          <p class="text-lg text-gray-700">
            Welcome to <strong class="text-indigo-600">Savannah Movies</strong>! We are a team of passionate movie enthusiasts who love curating the latest and greatest films from around the world. Our platform aims to provide a seamless and enjoyable movie discovery experience.
          </p>

          <p class="text-lg text-gray-700">
            Whether you're searching for a heart-pumping action thriller, a thought-provoking drama, or a timeless classic, <strong class="text-indigo-600">Savannah Movies</strong> has something for everyone. Our goal is to provide you with an easy way to browse, discover, and enjoy movies based on your interests.
          </p>

          <p class="text-lg text-gray-700">
            We believe that movies have the power to inspire, entertain, and connect people. Our team is always working hard to improve the platform and update our movie collection. Your feedback is important to us, and we are committed to providing the best possible experience for our users.
          </p>

          <div class="flex justify-center mt-6">
            <router-link 
              to="/movies" 
              class="inline-block text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Explore Movies
            </router-link>
          </div>
        </div>

        <!-- Right Section (Image) -->
        <div class="relative">
          <img 
            :src="'https://img.freepik.com/free-photo/view-3d-cinema-popcorn_23-2151069398.jpg'" 
            alt="Team working on movies"
            class="rounded-xl shadow-xl w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-xl"></div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center text-gray-500">
        <p>&copy; 2025 Savannah Movies. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
/* Custom Styling */
.container {
  max-width: 100%;
}

img {
  border-radius: 15px;
}
</style>
