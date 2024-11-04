<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'

const stores = ref()

const destacados = [
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/FastFood_CuisineCarousel@2x.png',
    title: 'Fast Food',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Breakfast_CuisineCarousel@2x.png',
    title: 'Breakfast',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/American_CuisineCarousel@2x.png',
    title: 'American',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Healthy_CuisineCarousel@2x.png',
    title: 'Healthy',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/ComfortFood_CuisineCarousel@2x.png',
    title: 'Comfort',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Bakery_CuisineCarousel@2x.png',
    title: 'Bakery',
    href: '#',
  },
  {
    image:
      'https://tb-static.uber.com/prod/web-eats-v2/categories/icons/Pizza_CuisineCarousel@2x.png',
    title: 'Pizza',
    href: '#',
  },
]

onMounted(async () => {
  stores.value = await api('GET', '/store')
})
</script>

<template>
  <h1 class="text-blue-500 text-center text-3xl font-bold mt-4">AcademEat</h1>
  <div class="mt-4 flex justify-center mx-4">
    <input type="text" placeholder="Pizza..." class="p-2 rounded-lg w-full" />
  </div>

  <p class="ml-4 mt-4 text-xl font-bold">Destacados</p>
  <div class="flex mx-4 mt-4 gap-6 overflow-x-auto">
    <a
      v-for="(destacado, index) in destacados"
      :key="index"
      :href="destacado.href"
      class="flex bg-white shadow-lg rounded-lg min-w-fit overflow-hidden"
    >
      <img :src="destacado.image" class="w-12" />
      <span class="p-4 font-bold"> {{ destacado.title }} </span>
    </a>
  </div>

  <p class="ml-4 mt-4 text-xl font-bold">Stores</p>
  <div class="flex gap-4 m-4 overflow-x-auto">
    <div
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
      <p class="text-gray-600">{{ store.description }}</p>
      <span class="text-sm text-gray-500">{{ store.category }}</span>
    </div>
  </div>

  <p class="ml-4 mt-4 text-xl font-bold">Stores</p>
  <div class="flex gap-4 m-4 overflow-x-auto">
    <div
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
      <p class="text-gray-600">{{ store.description }}</p>
      <span class="text-sm text-gray-500">{{ store.category }}</span>
    </div>
  </div>
</template>
