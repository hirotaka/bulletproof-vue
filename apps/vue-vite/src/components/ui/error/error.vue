<script setup lang="ts">
import { computed } from 'vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

type ErrorProps = {
  error: Error | string;
};

const props = defineProps<ErrorProps>();

const errorMessage = computed(() => {
  if (typeof props.error === 'string') {
    return props.error;
  }
  return props.error.message || 'An error occurred';
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center p-8 text-red-600"
    role="alert"
    aria-live="assertive"
  >
    <div class="flex items-center gap-3">
      <ExclamationTriangleIcon class="h-8 w-8 flex-shrink-0" aria-hidden="true" />
      <p class="text-lg font-semibold">{{ errorMessage }}</p>
    </div>
  </div>
</template>
