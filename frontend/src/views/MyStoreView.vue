<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
import { showSuccesToast } from '@/helpers/swalFunctions'
import VInput from '@/components/VInput.vue'
import { truncateText } from '@/helpers/truncateText'

const auth = useAuthStore()
const router = useRouter()

const me = ref()
const store = ref()

const portraitImage = ref()
const storeImage = ref()
const name = ref()
const description = ref()
const storeName = ref()
const storeDescription = ref()
const ownerId = ref()
const meId = ref()

const products = ref()

const showMenu = ref(false)
const isEditing = ref(false)

async function deleteStore() {
  try {
    await api('DELETE', `/store/${store.value.id}`)
    showSuccesToast('Store deleted successfully')
    await router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
async function editStore() {
  try {
    await api('PUT', `/store/${store.value.id}`, {
      name: storeName.value,
      description: storeDescription.value,
    })
    showSuccesToast('Store updated successfully')
    await router.push({ name: 'home' })
    isEditing.value = false
  } catch (error) {
    console.error(error)
  }
}

async function addProduct() {
  router.push(`/${store.value.id}/add-product`)
}

onMounted(async () => {
  me.value = await auth.me()
  store.value = await api('GET', '/user/find-store')
  portraitImage.value = store.value.portraitImage
  storeImage.value = store.value.storeImage
  name.value = store.value.name
  ownerId.value = store.value.ownerId
  meId.value = me.value.id
  description.value = store.value.description
  storeName.value = store.value.name
  storeDescription.value = store.value.description
  products.value = await api('GET', `/products/store/${store.value.id}`)
})
</script>

<template>
  <div class="flex justify-center">
    <img
      :src="portraitImage || 'https://placehold.co/600x300'"
      alt="store portrait"
      class="object-cover w-full aspect-[2/1]"
    />
    <div
      v-show="meId === ownerId"
      @click="showMenu = !showMenu"
      class="absolute ml-[93%] p-1 bg-white/65 backdrop-blur-md rounded-l-lg mt-2"
    >
      <AdjustmentsHorizontalIcon class="w-6 h-6" />
      <div v-if="showMenu" class="mr-6 text-end">
        <button @click="isEditing = true" class="p-1">Edit</button>
        <button @click="deleteStore" class="p-1">Delete</button>
        <button @click="addProduct" class="p-1">Add product</button>
      </div>
    </div>
  </div>
  <div class="flex justify-center -mt-20">
    <img
      :src="storeImage || 'https://placehold.co/400x400'"
      alt="store image"
      class="rounded-full w-36 h-36 border-white border-4"
    />
  </div>
  <div class="mx-4 mt-3">
    <VInput
      v-if="isEditing"
      v-model="storeName"
      labelText="Full Name"
      type="text"
      placeholder="My awesome store name"
      hasAutocomplete="off"
      :isDisabled="!isEditing"
    />
    <VInput
      v-if="isEditing"
      v-model="storeDescription"
      labelText="Description"
      type="text"
      placeholder="Description of store"
      hasAutocomplete="off"
      :isDisabled="!isEditing"
    />
    <p
      v-if="isEditing"
      @click="editStore"
      class="hover:underline text-center cursor-pointer my-4"
    >
      Save changes
    </p>
    <h1 v-if="!isEditing" class="text-center text-3xl mt-4">{{ name }}</h1>
    <p v-if="!isEditing">{{ description }}</p>
    <div class="flex flex-col min-w-full justify-center gap-4 mb-16">
      <a
        v-for="product in products"
        :key="product.id"
        :href="`/product/${product.id}`"
        class="rounded overflow-hidden shadow-lg bg-white p-4 m-4"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-48 object-cover rounded-md mb-4"
        />

        <div class="px-4 py-2">
          <h3 class="font-bold text-xl text-gray-800">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2">{{ product.category }}</p>
          <p class="text-gray-700 text-base mb-4">
            {{ truncateText(product.description, 80) }}
          </p>
        </div>

        <div class="px-4 py-2 flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-800"
            >${{ product.price }}</span
          >
          <span
            :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
            class="text-sm font-semibold"
          >
            {{ product.stock > 0 ? 'En stock' : 'Agotado' }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
