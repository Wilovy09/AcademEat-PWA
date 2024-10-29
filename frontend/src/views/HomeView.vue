<script setup lang="ts">
import { ref } from 'vue'

const destacados = [
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Pizza',
    href: '#',
  },
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Hamburguer',
    href: '#',
  },
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Malteada',
    href: '#',
  },
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Pizza',
    href: '#',
  },
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Hamburguer',
    href: '#',
  },
  {
    image: '@/assets/images/fallback_profile_image.png',
    title: 'Malteada',
    href: '#',
  },
]

const ofertas = [
  {
    image: "#",
    price: 12,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 9,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 10.5,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 20,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 19,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 12,
    name: "Poll@",
    href: "#"
  },
  {
    image: "#",
    price: 12,
    name: "Poll@",
    href: "#"
  },
]
</script>

<template>
  <div class="mt-8 flex justify-center mx-4">
    <input type="text" placeholder="Pizza..." class="p-2 rounded-lg w-full" />
  </div>

  <p class="ml-4 mt-4">Destacados</p>
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

  <p class="ml-4 mt-4">Ofertas</p>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 mx-4 mt-4">
    <a
      v-for="(oferta, index) in ofertas"
      :key="index"
      :href="oferta.href"
      class="p-2 max-w-screen flex flex-col gap-2 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div class="flex gap-4 justify-between">
        <img
          :src="oferta.image"
          class="w-24 rounded-xl shadow-lg"
        />

        <div class="max-w-[200px] w-full grid grid-rows-2">
          <span class="text-xl font-bold grid place-items-center"> ${{ oferta.price.toFixed(2) }} </span>

          <div class="w-full grid grid-cols-3 justify-self-center">
            <button class="bg-blue-500 text-white rounded-l-lg p-3">-</button>

            <span class="bg-blue-500 text-white p-3 grid place-items-center">
              0
            </span>

            <button class="bg-blue-500 text-white rounded-r-lg p-3">+</button>
          </div>
        </div>
      </div>

      <span
        class="col-span-5 pl-5 text-lg font-bold"
      >
        {{ oferta.name }}
      </span>
    </a>
  </div>
</template>
