<script setup lang="ts">
import { ref, watch, type VNode } from 'vue'
import { Button } from '../button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer'

export interface FormDrawerProps {
  isDone: boolean
  triggerButton?: VNode
  submitButton?: VNode
  title: string
}

const props = withDefaults(defineProps<FormDrawerProps>(), {
  isDone: false,
})

const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

// Close drawer when form submission is done
watch(
  () => props.isDone,
  (newValue) => {
    if (newValue) {
      close()
    }
  },
)
</script>

<template>
  <Drawer
    :open="isOpen"
    @update:open="
      (value) => {
        if (!value) {
          close()
        } else {
          open()
        }
      }
    "
  >
    <DrawerTrigger as-child>
      <slot name="triggerButton">
        <component :is="triggerButton" />
      </slot>
    </DrawerTrigger>
    <DrawerContent class="flex max-w-[800px] flex-col justify-between sm:max-w-[540px]">
      <div class="flex flex-col">
        <DrawerHeader>
          <DrawerTitle>{{ title }}</DrawerTitle>
        </DrawerHeader>
        <div>
          <slot></slot>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose as-child>
          <Button variant="outline" type="submit"> Close </Button>
        </DrawerClose>
        <slot name="submitButton">
          <component :is="submitButton" />
        </slot>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
