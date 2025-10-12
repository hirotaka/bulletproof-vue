<script setup lang="ts">
import { DialogOverlay as DialogOverlayPrimitive } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export interface DialogOverlayProps {
  class?: HTMLAttributes['class']
}

defineProps<DialogOverlayProps>()
</script>

<template>
  <DialogOverlayPrimitive :class="$props.class">
    <slot></slot>
  </DialogOverlayPrimitive>
</template>
