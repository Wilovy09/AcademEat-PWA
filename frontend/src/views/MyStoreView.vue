<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'

const auth = useAuthStore()

const me = ref()
const store = ref()

const portraitImage = ref()
const storeImage = ref()
const name = ref()
const description = ref()

onMounted(async () => {
  me.value = await auth.me()
  store.value = await api('GET', '/user/find-store')
  portraitImage.value = store.value.portraitImage
  storeImage.value = store.value.storeImage
  name.value = store.value.name
  description.value = store.value.description
})
</script>

<template>
  <div class="flex justify-center">
    <img :src="portraitImage || 'https://placehold.co/600x300'" alt="store portrait"
      class="object-cover w-full aspect-[2/1]" />
  </div>
  <div class="flex justify-center -mt-20">
    <img :src="storeImage || 'https://placehold.co/400x400'" alt="store image"
      class="rounded-full w-36 h-36 border-white border-4" />
  </div>
  <div class="mx-4 mt-3">
    <h1 class="text-center text-3xl mt-4">{{ name }}</h1>
    <p>{{ description }}</p>
  </div>
</template>
