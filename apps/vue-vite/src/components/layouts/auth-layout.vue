<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import logo from '@/assets/logo.svg'
import Link from '@/components/ui/link/Link.vue'
import { paths } from '@/config/paths'
import { useUser } from '@/lib/auth'

interface Props {
  title: string
}

const props = defineProps<Props>()
const router = useRouter()
const route = useRoute()
const user = useUser()

const redirectTo = computed(() => {
  const redirect = route.query.redirectTo
  return typeof redirect === 'string' ? redirect : null
})

// Redirect authenticated users to dashboard
watch(
  () => user.data.value,
  (userData) => {
    if (userData) {
      router.replace(redirectTo.value ?? paths.app.dashboard.getHref())
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <Link class="flex items-center text-white" :to="paths.home.getHref()">
          <img class="h-24 w-auto" :src="logo" alt="Workflow" />
        </Link>
      </div>

      <h2 class="mt-3 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
