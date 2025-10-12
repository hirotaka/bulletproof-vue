<script setup lang="ts">
import { DropdownMenu as DropdownPrimitive } from 'radix-vue/namespaced'
</script>

<template>
  <DropdownPrimitive.Trigger>
    <slot></slot>
  </DropdownPrimitive.Trigger>
</template>
