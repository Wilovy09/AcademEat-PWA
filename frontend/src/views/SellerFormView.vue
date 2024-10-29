<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { fileToBase64 } from '@/utils/convertImgToBase64'
import VInput from '@/components/VInput.vue'

const auth = useAuthStore()
const router = useRouter()

const me = ref()
const storeName = ref('')
const storeDescription = ref('')
const storeCategory = ref(null)
const portraitImage = ref<File | null>(null)
const portraitImageBase64 = ref<string | null>(null)
const storeImage = ref<File | null>(null)
const storeImageBase64 = ref<string | null>(null)

const showSelectPortraitImage = ref(false)
const showSelectStoreImage = ref(false)

async function handleFileChange(event: Event, type: 'portrait' | 'store') {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]

    if (type === 'portrait') {
      portraitImage.value = file
      portraitImageBase64.value = await fileToBase64(file)
    } else if (type === 'store') {
      storeImage.value = file
      storeImageBase64.value = await fileToBase64(file)
    }
  }
}

async function createStore() {
  try {
    const response = await api("POST", "/store/create", {
      ownerId: me.value.id,
      name: storeName.value,
      description: storeDescription.value,
      category: storeCategory.value,
      portraitImage: portraitImageBase64.value,
      storeImage: storeImageBase64.value,
    })
    console.log(response)
    showSuccesToast('Store created')
    router.push({ name: 'my-store' })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  me.value = await auth.me()
})
</script>

<template>
  <div @click="showSelectPortraitImage = !showSelectPortraitImage" class="flex justify-center">
    <img :src="portraitImageBase64 || 'https://placehold.co/600x300'" alt="store portrait"
      class="object-cover w-full aspect-[2/1]" />
  </div>
  <div @click="showSelectStoreImage = !showSelectStoreImage" class="flex justify-center -mt-20">
    <img :src="storeImageBase64 || 'https://placehold.co/400x400'" alt="store image"
      class="rounded-full w-36 h-36 border-white border-4" />
  </div>
  <form @submit.prevent="createStore" class="mx-4 gap-4 h-[calc(100vh-22rem)] flex flex-col justify-between">
    <div>
      <label v-show="showSelectPortraitImage">
        Store portrait image
        <input @change="event => handleFileChange(event, 'portrait')"
          class="w-full mt-4 text-sm cursor-pointer focus:outline-none" type="file" />
      </label>
      <label v-show="showSelectStoreImage">
        Store image
        <input @change="event => handleFileChange(event, 'store')"
          class="w-full mt-4 text-sm cursor-pointer focus:outline-none" type="file" />
      </label>
      <VInput v-model="storeName" labelText="Store name" type="text" placeholder="My amazing store"
        hasAutocomplete="off" />
      <VInput v-model="storeDescription" labelText="Description" type="text" placeholder="My amazing store description"
        hasAutocomplete="off" />

      <label>
        Category
        <select v-model="storeCategory" class="p-3 border-blue-700 border-[1px] rounded-lg bg-white w-full text-black">
          <option value="value1" selected>Value 1</option>
          <option value="value2">Value 2</option>
          <option value="value3">Value 3</option>
        </select>
      </label>
    </div>
    <button class="w-full bg-blue-500 text-white p-2 rounded-lg">
      Create store
    </button>
  </form>
</template>
