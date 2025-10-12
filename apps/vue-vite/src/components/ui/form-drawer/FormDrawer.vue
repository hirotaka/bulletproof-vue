<script setup lang="ts">
import { watch } from 'vue'
import { Button } from '../button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../drawer'

export interface FormDrawerProps {
  open: boolean
  title: string
  submitText?: string
  isLoading?: boolean
  isDone?: boolean
}

const props = withDefaults(defineProps<FormDrawerProps>(), {
  submitText: 'Submit',
  isLoading: false,
  isDone: false,
})

const emit = defineEmits<{
  close: []
  submit: []
  'update:open': [value: boolean]
}>()

const handleOpenChange = (isOpen: boolean) => {
  if (!isOpen) {
    emit('close')
  }
  emit('update:open', isOpen)
}

// Close drawer when form submission is done
watch(
  () => props.isDone,
  (newValue) => {
    if (newValue) {
      emit('update:open', false)
      emit('close')
    }
  },
)
</script>

<template>
  <Drawer :open="open" @update:open="handleOpenChange">
    <slot name="trigger"></slot>
    <DrawerContent
      class="flex max-w-[800px] flex-col justify-between sm:max-w-[540px]"
      side="right"
    >
      <div class="flex flex-col">
        <DrawerHeader>
          <DrawerTitle>{{ title }}</DrawerTitle>
        </DrawerHeader>
        <div class="px-6">
          <slot></slot>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose as-child>
          <Button variant="outline" type="button"> Close </Button>
        </DrawerClose>
        <Button type="submit" :is-loading="isLoading" :disabled="isLoading" @click="emit('submit')">
          {{ submitText }}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
