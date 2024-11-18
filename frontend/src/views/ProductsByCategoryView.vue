<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { useRoute } from 'vue-router'

interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  stock: number
  image: string
}

const route = useRoute()
const products = ref<Product[]>([])
const category = route.params.category
const errorMessage = ref('')

const fetchProducts = async () => {
  try {
    products.value = await api('GET', `/products/categories/${useRoute().params.category}`)
  } catch (error) {
    console.error('Error fetching products:', error)
    errorMessage.value = 'Hubo un error al obtener los productos.'
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-center mb-4">
      Productos en la categoría {{ category }}
    </h1>

    <div v-if="errorMessage" class="text-center text-red-600">
      {{ errorMessage }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <a
        v-for="product in products"
        :key="product.id"
        :href="`/product/${product.id}`"
        class="rounded shadow-lg bg-white p-4 m-4"
      >
        <img
          :src="product.image"
          alt="Imagen del producto"
          class="h-40 w-full object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm">{{ product.description }}</p>
          <span class="">${{ product.price }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
