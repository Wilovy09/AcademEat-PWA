<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import {
  UserCircleIcon as UserCircleIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
} from '@heroicons/vue/24/solid'
import VInput from '@/components/VInput.vue'

const auth = useAuthStore()
const router = useRouter()

const me = ref()
const email = ref()
const fullName = ref()
const profileImage = ref()
const isEditing = ref(false)

async function logout() {
  await auth.logout()
  router.push({ name: 'auth' })
}

async function saveChanges() {
  try {
    const response = await api('POST', '/update-user', {
      fullName: fullName.value,
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  } finally {
    isEditing.value = false
  }
}

onMounted(async () => {
  me.value = await auth.me()
  email.value = me.value.email
  if (me.value.fullName != '') {
    fullName.value = me.value.fullName
  }
})
</script>

<template>
  <div class="flex justify-center">
    <UserCircleIconSolid class="w-36 h-36" />
    <img src="" alt="profile image" />
    <div class="absolute flex justify-end w-full mr-4 mt-4">
      <PencilSquareIconSolid @click="isEditing = !isEditing" class="w-8 h-8" />
    </div>
  </div>
  <div class="grid mx-4 gap-2">
    <input v-if="isEditing" @change="profileImage" class="w-full text-sm border cursor-pointerfocus:outline-none"
      type="file" />
    <VInput v-model="fullName" labelText="Full Name" type="text" placeholder="Not full name" hasAutocomplete="off"
      :isDisabled="!isEditing" />
    <VInput v-model="email" labelText="Email" type="text" hasAutocomplete="off" isDisabled />
  </div>
  <p v-if="isEditing" @click="saveChanges" class="text-center my-4 cursor-pointer hover:underline">
    Save changes
  </p>
  <div class="grid my-3 gap-3">
    <button class="p-2 bg-blue-500 text-white rounded-lg mx-4">
      I wanna be seller
    </button>
    <button @click="logout" class="p-2 bg-red-500 text-white rounded-lg mx-4">
      Logout
    </button>
  </div>
</template>
