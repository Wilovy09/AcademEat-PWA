<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string | null
  labelText: string
  isDisabled?: boolean
  type: 'text' | 'email' | 'password'
  hasEye?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isPassword = ref(props.type === 'password')
const togglePasswordVisibility = () => {
  isPassword.value = !isPassword.value
}
</script>

<template>
  <div class="z-0">
    <label class="capitalize block text-base mb-2">{{ labelText }}</label>
    <div class="flex">
      <input
        :type="isPassword ? 'password' : 'text'"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        v-bind="$attrs"
        :disabled="isDisabled"
        :class="{
          'text-base': isDisabled,
          'bg-gray-300': isDisabled,
          'border-gray-400': isDisabled,
        }"
        class="bg-white py-3 px-4 block w-full border border-blue-800 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:border-2 transition-colors duration-300"
      />
      <button
        v-if="props.type === 'password' && props.hasEye"
        @click="togglePasswordVisibility"
        type="button"
        class="-ml-8 flex items-center"
      >
        <EyeSlashIcon v-if="isPassword" class="w-6 h-6 text-black" />
        <EyeIcon v-if="!isPassword" class="w-6 h-6 text-black" />
      </button>
    </div>
  </div>
</template>
