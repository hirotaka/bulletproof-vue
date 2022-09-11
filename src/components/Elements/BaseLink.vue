<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink class="text-indigo-600 hover:text-indigo-900">
    <slot />
  </RouterLink>
</template>
