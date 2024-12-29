<script setup lang="tsx">
import VErrorBoundary from "vue-error-boundary";

import { ErrorFallback } from "@/components/Error";
import { AppNotifications } from "@/components/Notifications";
import { AuthProvider } from "@/providers";
</script>

<template>
  <VErrorBoundary :fall-back="ErrorFallback">
    <AppNotifications />
    <AuthProvider>
      <slot></slot>
    </AuthProvider>
  </VErrorBoundary>
</template>
