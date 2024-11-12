<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { fileToBase64 } from '@/utils/convertImgToBase64'
import VInput from '@/components/VInput.vue'
import VInputNumber from '@/components/VInputNumber.vue'
import { showSuccesToast } from '@/helpers/swalFunctions'
import { categories } from '@/const/consts'
import { useRoute } from 'vue-router'

let storeId: number

const name = ref('')
const description = ref('')
const price = ref('')
const inventory = ref('')
const category = ref(null)
const imageFile = ref<File | null>(null)
const imageBase64 = ref<string | null>(null)

const showSelectImage = ref(false)

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    imageFile.value = file
    imageBase64.value = await fileToBase64(file)
  }
}

async function createProduct() {
  try {
    const response = await api('POST', '/products', {
      storeId: storeId,
      name: name.value,
      description: description.value,
      price: Number(price.value),
      stock: Number(inventory.value),
      category: category.value,
      image: imageBase64.value,
    })
    console.log(response)
    showSuccesToast('Product created')
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  storeId = Number(useRoute().params.storeId)
})
</script>

<template>
  <div @click="showSelectImage = !showSelectImage" class="flex justify-center">
    <img
      :src="imageBase64 || 'https://placehold.co/600x300'"
      alt="product image"
      class="object-cover w-full aspect-[2/1]"
    />
  </div>
  <main class="m-4">
    <form @submit.prevent="createProduct" class="flex flex-col gap-4">
      <label v-show="showSelectImage">
        Product image
        <input
          @change="handleFileChange"
          class="w-full mt-4 text-sm cursor-pointer focus:outline-none"
          type="file"
        />
      </label>
      <VInput
        v-model="name"
        labelText="Name"
        type="text"
        placeholder="Product name"
      />
      <VInput
        v-model="description"
        labelText="Description"
        type="text"
        placeholder="Product description"
      />
      <VInputNumber v-model="price" labelText="Price" />
      <VInputNumber v-model="inventory" labelText="Inventory" />
      <label>
        Category
        <select
          v-model="category"
          class="p-3 border-blue-700 border-[1px] rounded-lg bg-white w-full text-black"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.name }}
          </option>
        </select>
      </label>
      <button class="w-full bg-blue-500 text-white p-2 rounded-lg">
        Create product
      </button>
    </form>
  </main>
</template>
