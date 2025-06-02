import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Views
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
import RegisterView from '../views/auth/Register.vue'
import LoginView from '../views/auth/Login.vue'
import AboutView from '../views/AboutView.vue'
import MovieDetail from '@/views/MovieDetail.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

// Layouts
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, layout: AuthenticatedLayout },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { layout: GuestLayout },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: GuestLayout },
    },
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      meta: { layout: GuestLayout },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { layout: GuestLayout },
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
      meta: { requiresAuth: true, layout: AuthenticatedLayout },
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetail,
      meta: { requiresAuth: true, layout: AuthenticatedLayout },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation Guard to handle authentication
router.beforeEach((to, from, next) => {
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) {
      // If the user is not authenticated, redirect to login
      next({ name: 'login' })
    } else {
      // If the user is authenticated, allow navigation
      if (to.name === 'login' && from.name === null) {
        // Prevent routing to login page if already logged in
        next({ name: 'home' })  // or whichever route you want to redirect to after login
      } else {
        next()
      }
    }
  })
})


export default router
