<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { categories } from '@/const/consts'
import { truncateText } from '@/helpers/truncateText'
import { useRouter } from 'vue-router'
import { showErrorToast } from '@/helpers/swalFunctions'

const stores = ref<any[]>([])
const products = ref<any[]>([])
const destacados = categories

const findStoreText = ref('')

const router = useRouter()

async function findStore() {
  if (findStoreText.value.trim()) {
    const store = stores.value.find(store =>
      store.name.toLowerCase().includes(findStoreText.value.toLowerCase()),
    )

    if (store) {
      router.push(`/store/${store.id}`)
    } else {
      showErrorToast('Tienda no encontrada')
    }
  }
}

onMounted(async () => {
  stores.value = await api('GET', '/store')
  products.value = await api('GET', '/products')
})
</script>

<template>
  <h1 class="text-blue-500 text-center text-3xl font-bold mt-4">AcademEat</h1>
  <div class="mt-4 flex justify-center mx-4">
    <input
      v-model="findStoreText"
      @change="findStore"
      type="text"
      placeholder="Pizza..."
      class="p-2 rounded-lg w-full"
    />
  </div>

  <p class="ml-4 mt-4 text-xl font-bold">Categories</p>
  <div class="flex mx-4 mt-4 gap-6 overflow-x-auto">
    <a
      v-for="(destacado, index) in destacados"
      :key="index"
      :href="`/products/categories/${destacado.value}`"
      class="flex bg-white shadow-lg rounded-lg min-w-fit overflow-hidden"
    >
      <img :src="destacado.image" class="w-12" />
      <span class="p-4 font-bold"> {{ destacado.name }} </span>
    </a>
  </div>

  <p class="ml-4 mt-4 text-xl font-bold">Products</p>
  <div class="flex gap-4 m-4 overflow-x-auto">
    <a
      v-for="product in products"
      :key="product.id"
      :href="`/product/${product.id}`"
      class="rounded shadow-lg bg-white p-4 m-4"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="min-w-[350px] h-48 object-cover rounded-md mb-4"
      />

      <div class="px-4 py-2">
        <h3 class="font-bold text-xl text-gray-800">
          {{ product.name }}
        </h3>
        <p class="text-sm text-gray-600 mb-2">{{ product.category }}</p>
        <p class="text-gray-700 text-base mb-4">
          {{ truncateText(product.description, 85) }}
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

  <p class="ml-4 mt-4 text-xl font-bold">Stores</p>
  <div class="flex gap-4 m-4 overflow-x-auto mb-20">
    <a
      :href="`/store/${store.id}`"
      v-for="store in stores"
      :key="store.id"
      class="bg-white shadow-lg min-w-[90%] rounded-lg p-4"
    >
      <img
        :src="store.portraitImage || 'https://placehold.co/600x300'"
        alt="Store Image"
        class="w-full h-32 object-cover rounded-md mb-4"
      />
      <h3 class="font-bold text-lg">{{ store.name }}</h3>
      <p class="text-gray-600">{{ truncateText(store.description, 85) }}</p>
      <span class="text-sm text-gray-500">{{ store.category }}</span>
    </a>
  </div>
</template>
