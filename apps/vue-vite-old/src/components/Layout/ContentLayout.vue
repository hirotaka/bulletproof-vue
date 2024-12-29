<script setup lang="ts">
import { AppHead } from "../Head";

type ContentLayoutProps = {
  title: string;
};

defineProps<ContentLayoutProps>();
</script>

<template>
  <AppHead :title="title" />
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <slot></slot>
    </div>
  </div>
</template>
