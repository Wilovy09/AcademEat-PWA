<script lang="ts" setup>
import { api } from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const product = ref()

onMounted(async () => {
  product.value = await api('GET', `/products/${useRoute().params.productId}`)
})
</script>

<template>
  <p v-if="!product" class="text-center mt-8">Cargando producto...</p>
  <main v-else>
    <img
      :src="product.image || 'https://placehold.co/600x300'"
      alt="store portrait"
      class="object-cover w-full aspect-[2/1]"
    />
    <section class="m-4">
      <div class="flex justify-between">
        <h1 class="text-xl font-semibold">{{ product.name }}</h1>
        <p :class="product.stock > 0 ? 'text-green-500' : 'text-gray-500'">
          {{ product.stock > 0 ? `${product.stock} Disponibles` : 'Agotado' }}
        </p>
      </div>
      <p class="text-gray-600">{{ product.category }}</p>
      <p class="text-lg">{{ product.description }}</p>
      <div class="flex justify-end">
        {{ '$' + product.price + ' MXN' }}
      </div>
    </section>
  </main>
</template>
