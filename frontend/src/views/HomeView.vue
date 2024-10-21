<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  auth.logout()
  router.push({ name: 'auth' })
}
</script>

<template>
  <button @click="logout" type="button">Logout</button>
</template>
