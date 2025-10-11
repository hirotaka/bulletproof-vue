<script setup lang="ts">
import Label from './label.vue'
import Error from './error.vue'

interface FieldWrapperProps {
  label?: string
  error?: string
  description?: string
  required?: boolean
}

defineProps<FieldWrapperProps>()
</script>

<template>
  <div>
    <Label v-if="label">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1" aria-label="required">*</span>
      <div class="mt-1">
        <slot />
      </div>
    </Label>
    <div v-else class="mt-1">
      <slot />
    </div>
    <p v-if="description" class="text-sm text-gray-500 mt-1">
      {{ description }}
    </p>
    <Error :error-message="error" />
  </div>
</template>
