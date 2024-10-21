import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  function authenticate(result) {
    token.value = result.token
    localStorage.setItem('token', result.token)
  }

  async function login(payload) {
    const result = await api('POST', '/login', payload)
    authenticate(result)
    return result
  }

  async function register(payload) {
    const result = await api('POST', '/register', payload)
    authenticate(result)
    return result
  }

  async function logout() {
    await api('DELETE', '/logout')
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  async function me() {
    const result = await api('GET', '/me')
    user.value = result.me
    return user.value
  }

  return { user, login, register, logout, me }
})
