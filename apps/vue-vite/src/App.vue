<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Notifications } from '@/components/ui/notifications'

const isDev = import.meta.env.DEV
</script>

<template>
  <RouterView />
  <Notifications />
  <VueQueryDevtools v-if="isDev" />
</template>
