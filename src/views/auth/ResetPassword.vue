<script setup>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from 'vue-toastification'; // Import toast

// State Variables
const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Initialize Toast
const toast = useToast();

// Handle Password Reset
const handleResetPassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email.value);
    successMessage.value = 'Password reset email sent successfully! Check your inbox.';
    toast.success(successMessage.value); // Show success toast
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      errorMessage.value = 'Invalid email address.';
      toast.error(errorMessage.value); // Show error toast
    } else if (error.code === 'auth/user-not-found') {
      errorMessage.value = 'No account found with this email.';
      toast.error(errorMessage.value); // Show error toast
    } else {
      errorMessage.value = 'Something went wrong. Please try again later.';
      toast.error(errorMessage.value); // Show error toast
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen items-center flex">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
      <div class="flex flex-col justify-center">
        <a href="/" class="flex m mb-6 d:me-24">
          <img :src="'/logo.png'" class="h-14 me-3" alt="Logo" />
        </a>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Explore Movies
        </h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          At Savannah Tv, we bring you the best in cinematic experiences. From timeless classics to the latest
          blockbusters, explore a diverse range of movies that entertain, inspire, and transport you to different worlds.
        </p>

        <a href="/about" class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
          Read more about our app
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>

      <!-- Login Form -->
      <div>
        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
          <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
            <!-- Email Input -->
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                email</label>
              <input type="email" v-model="email" id="email" name="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Enter your email" required />
            </div>

            <!-- Submit Button -->
            <button type="submit"
                    class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    :disabled="isLoading">
              <span v-if="isLoading">Sending...</span>
              <span v-else>Send Reset Link</span>
            </button>

            <div v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="text-green-500 text-sm mt-2 text-center">
              {{ successMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

