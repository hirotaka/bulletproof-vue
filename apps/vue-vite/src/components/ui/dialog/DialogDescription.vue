<script setup lang="ts">
import { DialogDescription as DialogDescriptionPrimitive } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export interface DialogDescriptionProps {
  class?: HTMLAttributes['class']
}

defineProps<DialogDescriptionProps>()
</script>

<template>
  <DialogDescriptionPrimitive :class="$props.class">
    <slot></slot>
  </DialogDescriptionPrimitive>
</template>
