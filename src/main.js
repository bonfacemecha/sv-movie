import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './stores/useUserStore'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKPH6qEAheiCj46Z20PaGmYvw4dJ5B4j4",
  authDomain: "savannah-movies.firebaseapp.com",
  projectId: "savannah-movies",
  storageBucket: "savannah-movies.firebasestorage.app",
  messagingSenderId: "1030607147805",
  appId: "1:1030607147805:web:c8003903e41cdb704c47f4"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
const options = {
    timeout: 3000,
};
app.use(Toast, options);

const auth = getAuth()

// Initialize the user store to update the user's state
onAuthStateChanged(auth, (user) => {
  const userStore = useUserStore()
  if (user) {
    // If user is logged in, set the user data in the store
    userStore.setUser({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
  } else {
    // If no user is logged in, clear the user data
    userStore.clearUser()
  }
})

app.mount('#app')
