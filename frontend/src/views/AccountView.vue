<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import {
  UserCircleIcon as UserCircleIconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
} from '@heroicons/vue/24/solid'
import { fileToBase64 } from '@/utils/convertImgToBase64'
import { showSuccesToast } from '@/helpers/swalFunctions'
import VInput from '@/components/VInput.vue'

const auth = useAuthStore()
const router = useRouter()

const me = ref()
const isSeller = ref()
const email = ref()
const fullName = ref()
const profileImage = ref<File | null>(null)
const profileImageBase64 = ref<string | null>(null)
const isEditing = ref(false)

async function logout() {
  await auth.logout()
  router.push({ name: 'auth' })
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    profileImage.value = target.files[0]
    profileImageBase64.value = await fileToBase64(profileImage.value)
  }
}

async function saveChanges() {
  try {
    const result = await api('POST', '/user/update', {
      fullName: fullName.value,
      profileImage: profileImageBase64.value,
    })

    console.log(result)
    showSuccesToast('Account updated')
  } catch (error) {
    console.log(error)
  } finally {
    isEditing.value = false
  }
}

async function openStore() {
  if (me.value.isSeller === 'true') {
    showSuccesToast('You already have a store')
    return
  }
  router.push({ name: 'create-store' })
}

onMounted(async () => {
  me.value = await auth.me()
  isSeller.value = me.value.isSeller
  email.value = me.value.email
  profileImageBase64.value = me.value.profileImage
  if (me.value.fullName != '') {
    fullName.value = me.value.fullName
  }
})
</script>

<template>
  <main class="h-[calc(100vh-4rem)] flex flex-col justify-between">
    <section>
      <div class="flex justify-center mt-4">
        <UserCircleIconSolid v-if="!profileImageBase64" class="w-36 h-36" />
        <img :src="profileImageBase64" alt="profile image" v-if="profileImageBase64" class="w-36 h-36 rounded-full" />
        <div class="absolute flex justify-end w-full mr-4">
          <PencilSquareIconSolid @click="isEditing = !isEditing" class="w-8 h-8 cursor-pointer" />
        </div>
      </div>
      <div class="grid mx-4 gap-2">
        <input v-if="isEditing" @change="handleFileChange"
          class="w-full mt-4 text-sm border cursor-pointer focus:outline-none" type="file" />
        <VInput v-model="fullName" labelText="Full Name" type="text" placeholder="Not full name" hasAutocomplete="off"
          :isDisabled="!isEditing" />
        <VInput v-model="email" labelText="Email" type="text" hasAutocomplete="off" isDisabled />
      </div>
      <p v-if="isEditing" @click="saveChanges" class="text-center my-4 cursor-pointer hover:underline">
        Save changes
      </p>
    </section>
    <div class="grid my-3 gap-3">
      <button :disabled="isSeller === 'true'" @click="openStore"
        class="p-2 bg-blue-500 text-white rounded-lg mx-4 disabled:bg-gray-300 disabled:text-black">
        {{ isSeller === 'true' ? 'You have a store' : 'I wanna be seller' }}
      </button>
      <button @click="logout" class="p-2 bg-red-500 text-white rounded-lg mx-4">
        Logout
      </button>
    </div>
  </main>
</template>
