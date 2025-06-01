<script setup>
import { ref } from "vue";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication functions
import { useRouter } from "vue-router"; // for navigation

// Setup reactive variables
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false); // for showing a loading state during the login process

// Create a router instance to handle redirection
const router = useRouter();

// Function to handle login
const login = async () => {
  // Trim leading/trailing spaces
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  // Basic email validation regex (could be extended for stricter validation)
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  if (!trimmedPassword) {
    errorMessage.value = "Password cannot be empty.";
    return;
  }

  // Show loading indicator
  isLoading.value = true;

  try {
    // Attempt to sign in the user with the provided email and password
    await signInWithEmailAndPassword(getAuth(), trimmedEmail, trimmedPassword);
    // Redirect to the dashboard upon successful login or the page they were
    const redirectTo = router.currentRoute.value.query.redirect || '/movies'; // Redirect to dashboard or previous page
    router.push(redirectTo);
  } catch (error) {
    // Set error message for display
    if (error.code === "auth/invalid-email") {
      errorMessage.value = "The email address is not valid.";
    } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      errorMessage.value = "Invalid email or password.";
    } else {
      errorMessage.value = "Something went wrong, please try again.";
    }
  } finally {
    // Hide loading indicator after login attempt
    isLoading.value = false;
  }
};
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(getAuth(), provider);
    const user = result.user;
    alert("Signed in with Google: " + user.email);
    router.push('/movies')

  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
      <div class="flex flex-col justify-center">
        <a href="/" class="flex m mb-6 d:me-24">
          <img :src="'/logo.png'" class="h-14 me-3" alt="Logo" />
        </a>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Explore Movies
        </h1>
        <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          At Savannah Tv, we bring you the best in cinematic experiences. From timeless classics to the latest blockbusters, explore a diverse range of movies that entertain, inspire, and transport you to different worlds.
        </p>

        <a href="/movies"
          class="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
          Read more about our app
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>

      <!-- Login Form -->
      <div>
        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <form class="mt-8 space-y-6" @submit.prevent="login">
            <!-- Email Input -->
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" v-model="email" id="email" name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required />
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                password</label>
              <input type="password" v-model="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="remember" aria-describedby="remember" name="remember" type="checkbox"
                  class="w-4 h-4 border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div class="ms-3 text-sm">
                <label for="remember" class="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
              </div>
              <a href="#" class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost
                Password?</a>
            </div>

            <!-- Submit Button -->
            <button type="submit"
              class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              :disabled="isLoading">
              <span v-if="isLoading">Logging in...</span>
              <span v-else>Login</span>
            </button>

            <!-- Error Message -->
            <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>

            <!-- Create Account Link -->
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Not registered yet? <RouterLink to="/auth/register"
                class="text-blue-600 hover:underline dark:text-blue-500">Create an account</RouterLink>
            </div>
          </form>
          <div class="relative">
            <div class="inline-flex items-center justify-center w-full">
              <hr class="w-full h-px  bg-gray-200 border-0 dark:bg-gray-700">
              <span
                class="absolute px-2 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
            </div>
          </div>
          <div class="mt-4 text-center">
            <!-- Sign in with Google Button -->
            <button @click.prevent="signInWithGoogle" type="button"
              class="text-gray-900 cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-blue-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              <svg class="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 18 18">
                <path
                  d="M9.003 3.48c1.05 0 1.99.36 2.74 1.06l2.04-2.03C12.71 1.01 10.99.25 9.003.25 5.88.25 3.21 2.21 2.12 5.01l2.46 1.91C5.24 5.1 6.99 3.48 9.003 3.48z"
                  fill="#EA4335" />
                <path
                  d="M17.64 9.2c0-.63-.06-1.24-.18-1.82H9v3.45h4.84c-.21 1.14-.86 2.11-1.83 2.77v2.28h2.97c1.73-1.6 2.66-3.97 2.66-6.68z"
                  fill="#4285F4" />
                <path d="M4.58 10.41a5.41 5.41 0 0 1 0-3.42V4.01H1.62a8.985 8.985 0 0 0 0 8.02l2.96-2.3z"
                  fill="#FBBC05" />
                <path
                  d="M9.003 17.5c2.43 0 4.47-.8 5.96-2.18l-2.96-2.3c-.83.56-1.9.89-3 .89-2.02 0-3.75-1.37-4.37-3.22l-2.46 1.91c1.07 2.8 3.74 4.76 6.83 4.76z"
                  fill="#34A853" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
