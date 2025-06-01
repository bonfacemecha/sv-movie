// src/stores/userStore.js
import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,  // Will hold user object from Firebase
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },

  
  persist: true,  // Optional: if you want to persist the user across sessions
})
