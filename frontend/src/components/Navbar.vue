<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { HomeIcon, UserCircleIcon, BuildingStorefrontIcon } from '@heroicons/vue/24/outline'
import {
  HomeIcon as HomeIconSolid,
  UserCircleIcon as UserCircleIconSolid,
BuildingStorefrontIcon as BuildingStorefrontIconSolid
} from '@heroicons/vue/24/solid'

const me = ref()
const isSeller = ref(false)

onMounted(async () => {
  me.value = await auth.me()
  if(me.value.isSeller === 'true'){
    isSeller.value = true
  }
})
</script>

<template>
  <nav
    class="text-gray-font border-gray-99 fixed bottom-0 z-40 flex h-16 w-full justify-between border-t bg-white px-6 py-2 shadow-lg"
  >
    <RouterLink :to="{ name: 'home' }" v-slot="{ isActive }">
      <span
        class="text-primary flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <HomeIcon v-if="!isActive" class="w-8 h-8" />
        <HomeIconSolid v-else class="w-8 h-8 text-blue-500" />
      </span>
    </RouterLink>

    <RouterLink v-if="isSeller" :to="{ name: 'my-store' }" v-slot="{ isActive }">
      <span
        class="flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <BuildingStorefrontIcon v-if="!isActive" class="w-8 h-8" />
        <BuildingStorefrontIconSolid v-else class="w-8 h-8 text-blue-500" />
      </span>
    </RouterLink>

    <RouterLink :to="{ name: 'account' }" v-slot="{ isActive }">
      <span
        class="flex cursor-pointer flex-col items-center px-2 py-1 text-center text-sm hover:bg-gray-200 hover:text-gray-700"
      >
        <UserCircleIcon v-if="!isActive" class="w-8 h-8" />
        <UserCircleIconSolid v-else class="w-8 h-8 text-blue-500" />
      </span>
    </RouterLink>
  </nav>
</template>
