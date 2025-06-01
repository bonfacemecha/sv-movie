import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'
import RegisterView from '../views/auth/Register.vue'
import LoginView from '../views/auth/Login.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import MovieDetail from '@/views/MovieDetail.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'; 


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true,  layout: AuthenticatedLayout },
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
    name: 'ResetPassword',
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
      name: 'MovieDetail',
      component: MovieDetail,
      meta: { requiresAuth: true, layout: AuthenticatedLayout },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { layout: GuestLayout },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()

  // Return a promise to ensure we wait for the authentication state check
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (to.meta.requiresAuth && !user) {
        // If user is not authenticated, redirect to login
        next({ name: 'login', query: { redirect: to.fullPath } })
        resolve() // Resolve the promise after redirecting
      } else {
        next() // Allow navigation
        resolve() // Resolve the promise after allowing navigation
      }
    })
  })
})

export default router
