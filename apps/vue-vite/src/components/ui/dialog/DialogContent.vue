<script setup lang="ts">
import { DialogContent as DialogContentPrimitive } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export interface DialogContentProps {
  class?: HTMLAttributes['class']
}

defineProps<DialogContentProps>()
</script>

<template>
  <DialogContentPrimitive :class="$props.class">
    <slot></slot>
  </DialogContentPrimitive>
</template>
