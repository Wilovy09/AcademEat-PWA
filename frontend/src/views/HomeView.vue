<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'

const stores = ref()

const destacados = [
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/FastFood_CuisineCarousel@2x.png',
    title: 'Fast Food',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Breakfast_CuisineCarousel@2x.png',
    title: 'Breakfast',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/American_CuisineCarousel@2x.png',
    title: 'American',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Healthy_CuisineCarousel@2x.png',
    title: 'Healthy',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/ComfortFood_CuisineCarousel@2x.png',
    title: 'Comfort',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Bakery_CuisineCarousel@2x.png',
    title: 'Bakery',
    href: '#',
  },
  {
    image: 'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Pizza_CuisineCarousel@2x.png',
    title: 'Pizza',
    href: '#',
  },
]

onMounted(async () => {
  stores.value = await api("GET", "/store")
})
</script>

<template>
  <div class="mt-8 flex justify-center mx-4">
    <input type="text" placeholder="Pizza..." class="p-2 rounded-lg w-full" />
  </div>

  <p class="ml-4 mt-4">Destacados</p>
  <div class="flex mx-4 mt-4 gap-6 overflow-x-auto">
    <a v-for="(destacado, index) in destacados" :key="index" :href="destacado.href"
      class="flex bg-white shadow-lg rounded-lg min-w-fit overflow-hidden">
      <img :src="destacado.image" class="w-12" />
      <span class="p-4 font-bold"> {{ destacado.title }} </span>
    </a>
  </div>

  <p class="ml-4 mt-4">Stores</p>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 mt-4">
    <div v-for="(store) in stores" :key="store.id" class="bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <img :src="store.portraitImage" alt="Store Image" class="w-full h-32 object-cover rounded-md mb-4" />
      <h3 class="font-bold text-lg">{{ store.name }}</h3>
      <p class="text-gray-600">{{ store.description }}</p>
      <span class="text-sm text-gray-500">{{ store.category }}</span>
    </div>
  </div>
</template>
