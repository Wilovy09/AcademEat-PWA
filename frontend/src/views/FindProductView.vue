<script lang="ts" setup>
import { api } from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
import { showSuccesToast } from '@/helpers/swalFunctions'
import Swal from 'sweetalert2'
import { places } from '@/const/consts'

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
    showSuccesToast('Product deleted')
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

async function buyProduct() {
  const placeOptions = places
    .map(place => `<option value="${place.value}">${place.label}</option>`)
    .join('')

  Swal.fire({
    title: 'Comprar producto',
    html: `
          <input id="productQuantity" type="number" min="1" max="${product.value.stock}" class="swal2-input min-w-[260px] mb-4" placeholder="Ingresa la cantidad"/>

          <select id="pickupLocation" class="swal2-input">
            <option value="" disabled selected>Selecciona una ubicación</option>
            ${placeOptions}
          </select>
        `,
    showCancelButton: true,
    confirmButtonText: 'Comprar',
    preConfirm: async () => {
      const quantity = Number(document.getElementById('productQuantity').value)
      const location = document.getElementById('pickupLocation').value

      if (!quantity || quantity <= 0) {
        Swal.showValidationMessage('Por favor, ingresa una cantidad válida.')
        return
      }

      if (quantity > product.value.stock) {
        Swal.showValidationMessage('La cantidad supera el stock disponible.')
        return
      }

      if (!location) {
        Swal.showValidationMessage('Por favor, selecciona una ubicación.')
        return
      }

      const total = quantity * product.value.price
      const updatedStock = product.value.stock - quantity

      const payload = { stock: updatedStock }
      await api('PUT', `/products/${product.value.id}`, payload)
      return { quantity, total, location }
    },
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Compra exitosa!',
        html: `
          <p>Cantidad comprada: ${result.value.quantity}</p>
          <p>Ubicación: ${result.value.location}</p>
          <p>Total: $${result.value.total.toFixed(2)} MXN</p>
        `,
        icon: 'success',
      })

      // Actualizar el stock localmente
      product.value.stock -= result.value.quantity
    }
  })
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
        <span class="text-green-600">$</span>{{ product.price + ' MXN' }}
      </div>
      <div class="flex justify-center">
        <button
          v-if="product.stock >= 0"
          @click="buyProduct"
          class="p-2 bg-blue-500 text-white rounded-lg"
        >
          Comprar producto
        </button>
      </div>
    </section>
  </main>
</template>
