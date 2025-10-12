<script setup lang="ts">
import { DropdownMenu as DropdownPrimitive } from 'radix-vue/namespaced'
import { cn } from '@/utils/cn'

interface DropdownSeparatorProps {
  class?: string
}

const props = defineProps<DropdownSeparatorProps>()
</script>

<template>
  <DropdownPrimitive.Separator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
