<script setup lang="ts">
import logo from "@/assets/logo.svg";
import { BaseLink } from "@/components/Elements";
</script>

<template>
  <BaseLink class="flex items-center text-white" to="/app">
    <img class="h-4 w-auto" :src="logo" alt="Workflow" />
    <span class="text-xl text-white font-semibold ml-2"> Bulletproof Vue </span>
  </BaseLink>
</template>
