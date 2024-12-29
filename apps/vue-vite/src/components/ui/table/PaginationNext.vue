<script setup lang="ts">
import { ChevronRightIcon } from '@radix-icons/vue'
import { PaginationLink } from './'
</script>

<template>
  <PaginationLink aria-label="Go to next page" size="default" class="gap-1 pr-2.5" v-bind="$attrs">
    <span>Next</span>
    <ChevronRightIcon class="size-4" />
  </PaginationLink>
</template>
