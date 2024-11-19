<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { truncateText } from '@/helpers/truncateText'

const route = useRoute()
const auth = useAuthStore()
const router = useRouter()

const store = ref()
const products = ref()
const me = ref()

let storeId: number

onMounted(async () => {
  storeId = Number(route.params.id)
  console.log(storeId)
  store.value = await api('GET', `/store/${storeId}`)
  products.value = await api('GET', `/products/store/${storeId}`)
  me.value = await auth.me()

  if (store.value.ownerId === me.value.id) {
    router.push({ name: 'my-store' })
  }
})
</script>

<template>
  <main v-if="store">
    <div class="flex justify-center">
      <img
        :src="store.portraitImage || 'https://placehold.co/600x300'"
        alt="store portrait"
        class="object-cover w-full aspect-[2/1]"
      />
    </div>
    <div class="flex justify-center -mt-20">
      <img
        :src="store.storeImage || 'https://placehold.co/400x400'"
        alt="store image"
        class="rounded-full w-36 h-36 border-white border-4"
      />
    </div>
    <h1 class="text-center text-3xl mt-4">{{ store.name }}</h1>
    <p>{{ store.description }}</p>
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
  </main>
</template>
