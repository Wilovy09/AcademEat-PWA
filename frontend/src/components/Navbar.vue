<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="text-gray-font border-gray-99 fixed bottom-0 z-40 flex h-16 w-full justify-between border-t bg-white px-6 py-2 shadow-lg"
  >
    <RouterLink to="/">
      <span
        class="text-primary flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <i class="fas fa-home w-8 p-1"> </i>
        <span class="font-roboto mx-1">Home</span>
      </span>
    </RouterLink>
    <RouterLink to="/">
      <span
        class="flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <i class="fas fa-envelope w-8 p-1"> </i>
        <span class="font-roboto mx-1">Pesan</span>
      </span>
    </RouterLink>
    <RouterLink to="/">
      <span
        class="flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <i class="fas fa-user-circle w-8 p-1"> </i>
        <span class="font-roboto mx-1">Akun</span>
      </span>
    </RouterLink>
  </nav>
</template>
