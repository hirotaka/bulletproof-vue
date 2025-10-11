<script setup lang="ts">
import Label from './label.vue'
import Error from './error.vue'

interface FieldWrapperProps {
  label?: string
  error?: string
}

defineProps<FieldWrapperProps>()
</script>

<template>
  <div>
    <Label>
      {{ label }}
      <div class="mt-1">
        <slot />
      </div>
    </Label>
    <Error :error-message="error" />
  </div>
</template>
