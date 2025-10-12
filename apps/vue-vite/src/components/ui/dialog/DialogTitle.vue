<script setup lang="ts">
import { DialogTitle as DialogTitlePrimitive } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export interface DialogTitleProps {
  class?: HTMLAttributes['class']
}

defineProps<DialogTitleProps>()
</script>

<template>
  <DialogTitlePrimitive :class="$props.class">
    <slot></slot>
  </DialogTitlePrimitive>
</template>
