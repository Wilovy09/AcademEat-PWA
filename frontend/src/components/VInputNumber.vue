<script setup lang="ts">
defineProps<{
  modelValue: string | null
  labelText?: string
  isDisabled?: boolean
  hasEye?: boolean
  hasAutocomplete?: 'off'
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="z-0">
    <label class="capitalize block text-base mb-2">{{ labelText }}</label>
    <div class="flex">
      <input
        type="number"
        min="1"
        :value="modelValue"
        :autocomplete="hasAutocomplete"
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
    </div>
  </div>
</template>
