<script setup lang="ts">
import { Dialog as DrawerPrimitive } from 'radix-vue/namespaced'
</script>

<template>
  <DrawerPrimitive.Root>
    <slot></slot>
  </DrawerPrimitive.Root>
</template>
