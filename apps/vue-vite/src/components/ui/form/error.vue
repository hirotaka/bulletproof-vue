<script setup lang="ts">
interface ErrorProps {
  errorMessage?: string | null
}

const props = defineProps<ErrorProps>()
</script>

<template>
  <div
    v-if="errorMessage"
    role="alert"
    :aria-label="errorMessage"
    class="text-sm font-semibold text-red-500"
  >
    {{ errorMessage }}
  </div>
</template>
