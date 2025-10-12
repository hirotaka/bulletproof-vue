<script setup lang="ts">
import { DialogTitle } from 'radix-vue'
import { cn } from '@/utils/cn'

export interface DialogTitleProps {
  class?: string
}

const props = defineProps<DialogTitleProps>()
</script>

<template>
  <DialogTitle
    :class="cn('text-lg font-semibold leading-none tracking-tight', props.class)"
  >
    <slot></slot>
  </DialogTitle>
</template>
