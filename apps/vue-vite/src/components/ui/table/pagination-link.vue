<script setup lang="ts">
import type { AnchorHTMLAttributes } from 'vue'

import type { ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/components/ui/link'

type Props = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  /* @vue-ignore */
  AnchorHTMLAttributes

const props = withDefaults(defineProps<Props>(), {
  size: 'icon',
})
</script>

<template>
  <Link
    :to="props.href as string"
    :aria-current="props.isActive ? 'page' : undefined"
    :class="[
      buttonVariants({
        variant: props.isActive ? 'outline' : 'ghost',
        size: props.size,
      }),
    ]"
  >
    <slot></slot>
  </Link>
</template>
