<script setup lang="ts">
import { RouterLink } from "vue-router";
import { AppHead } from "@/components/Head";

interface LayoutProps {
  title: string;
}

defineProps<LayoutProps>();
</script>

<template>
  <AppHead :title="title" />
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <RouterLink class="flex items-center text-white" to="/">
          <img class="h-24 w-auto" src="@/assets/logo.svg" alt="Workflow" />
        </RouterLink>
      </div>
      <h2 class="mt-3 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
