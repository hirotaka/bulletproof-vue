<script setup lang="ts">
import { ChevronLeftIcon } from '@radix-icons/vue'
import { PaginationLink } from './'
</script>

<template>
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    class="gap-1 pl-2.5"
    v-bind="$attrs"
  >
    <ChevronLeftIcon class="size-4" />
    <span>Previous</span>
  </PaginationLink>
</template>
