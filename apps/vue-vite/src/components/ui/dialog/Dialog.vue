<script setup lang="ts">
import { DialogRoot } from 'radix-vue'

export interface DialogProps {
  open?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
})
</script>

<template>
  <DialogRoot :open="props.open">
    <slot></slot>
  </DialogRoot>
</template>
