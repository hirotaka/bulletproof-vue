<script setup lang="ts">
import { Label as LabelPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

interface LabelProps {
  class?: string
  asChild?: boolean
  htmlFor?: string
}

const props = defineProps<LabelProps>()

const computedClass = computed(() => cn(labelVariants(), props.class))
</script>

<template>
  <LabelPrimitive :class="computedClass" :as-child="asChild" :for="htmlFor">
    <slot />
  </LabelPrimitive>
</template>
