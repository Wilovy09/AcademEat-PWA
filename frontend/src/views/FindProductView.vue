<script lang="ts" setup>
import { api } from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
import { showSuccesToast } from '@/helpers/swalFunctions'

const auth = useAuthStore()
const router = useRouter()

const product = ref()
const me = ref()
const store = ref()
const isOwner = ref(false)

const showMenu = ref(false)

async function deleteProduct() {
  try {
    await api('DELETE', `/products/${product.value.id}`)
    router.push({ name: 'my-store' })
    showSuccesToast('Produc deleted')
  } catch (e) {
    console.log(e)
  }
}

async function editProduct() {
  try {
    router.push(`/${store.value.id}/edit-product/${product.value.id}`)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  product.value = await api('GET', `/products/${useRoute().params.productId}`)
  store.value = await api('GET', `/store/${product.value.storeId}`)
  me.value = await auth.me()
  if (store.value.ownerId === me.value.id) {
    isOwner.value = true
  }
})
</script>

<template>
  <p v-if="!product" class="text-center mt-8">Cargando producto...</p>
  <main v-else>
    <div class="flex justify-center">
      <img
        :src="product.image || 'https://placehold.co/600x300'"
        alt="store portrait"
        class="object-cover w-full aspect-[2/1]"
      />
      <div
        v-if="isOwner"
        @click="showMenu = !showMenu"
        class="absolute ml-[93%] p-1 bg-white/65 backdrop-blur-md rounded-l-lg mt-2"
      >
        <AdjustmentsHorizontalIcon class="w-6 h-6" />
        <div v-if="showMenu" class="mr-6 text-end">
          <button @click="editProduct" class="p-1">Edit</button>
          <button @click="deleteProduct" class="p-1">Delete</button>
        </div>
      </div>
    </div>

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
