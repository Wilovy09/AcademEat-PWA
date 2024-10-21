<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { showErrorToast } from '@/helpers/swalFunctions'
import VInput from '@/components/VInput.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isSignUp = ref(false)

async function login() {
  if (!isSignUp.value) {
    try {
      // Login
      const result = await auth.login({
        email: email.value,
        password: password.value,
      })
      if (result.errors) {
        for (const error of result.errors) {
          showErrorToast(error.message)
        }
        return
      }
      router.push({ name: 'home' })
    } catch (e: unknown) {
      showErrorToast(e as string)
    }
  } else {
    try {
      // SignUp
      if (password.value !== confirmPassword.value) {
        showErrorToast('Passwords do not match')
        return
      }
      const result = await auth.register({
        email: email.value,
        password: password.value,
      })
      if (result.errors) {
        for (const error of result.errors) {
          showErrorToast(error.message)
        }
        return
      }
      router.push({ name: 'home' })
    } catch (e: unknown) {
      showErrorToast(e as string)
    }
  }
}
</script>

<template>
  <main class="gradient min-h-screen minw-screen">
    <section class="flex justify-center">
      <img src="@/assets/logo.png" alt="AcademEat" />
    </section>
    <form
      @submit.prevent="login"
      class="grid gap-4 mx-4"
      :class="isSignUp ? 'mt-6' : 'mt-12'"
    >
      <VInput v-model="email" labelText="Email" type="email" />
      <VInput v-model="password" hasEye labelText="password" type="password" />
      <VInput
        v-if="isSignUp"
        v-model="confirmPassword"
        labelText="Confirm password"
        type="password"
      />
      <div class="grid gap-2">
        <button
          type="submit"
          class="bg-blue-500 p-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
        >
          {{ !isSignUp ? 'Login' : 'Create account' }}
        </button>
        <p
          @click="isSignUp = isSignUp ? false : true"
          class="mt-2 text-center cursor-pointer hover:underline"
        >
          {{ !isSignUp ? "Don't have account?" : 'I have account' }}
        </p>
      </div>
    </form>
  </main>
</template>
