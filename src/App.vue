<script setup lang="ts">
import { RouterView } from "vue-router";
import { AppProvider } from "@/providers";

import "./assets/index.css";
</script>

<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>
