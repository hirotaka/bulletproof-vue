<script setup lang="ts">
import { DialogDescription } from 'radix-vue'
import { cn } from '@/utils/cn'

export interface DialogDescriptionProps {
  class?: string
}

const props = defineProps<DialogDescriptionProps>()
</script>

<template>
  <DialogDescription :class="cn('text-sm text-muted-foreground', props.class)">
    <slot></slot>
  </DialogDescription>
</template>
