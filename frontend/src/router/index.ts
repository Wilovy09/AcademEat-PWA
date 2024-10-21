import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const token = useAuthStore().token
  const toRouteName = to.name?.toString()
  if (to.meta.requiresAuth && !token) {
    if (toRouteName !== 'auth') {
      next({ name: 'auth' })
    }
  }
  next()
})

export default router
