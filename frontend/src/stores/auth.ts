import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/services/api'

type Result = {
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  function authenticate(result: Result) {
    token.value = result.token
    localStorage.setItem('token', result.token)
  }

  async function login(payload: object) {
    const result = await api('POST', '/login', payload)
    authenticate(result)
    return result
  }

  async function register(payload: object) {
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
    user.value = result.user
    return user.value
  }

  return { token, user, login, register, logout, me }
})
