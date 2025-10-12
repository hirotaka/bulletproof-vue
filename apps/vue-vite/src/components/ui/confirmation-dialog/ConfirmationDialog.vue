<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '../dialog'
import { Button } from '../button'
import { cn } from '@/utils/cn'

export interface ConfirmationDialogProps {
  open?: boolean
  title?: string
  body?: string
  confirmText?: string
  cancelText?: string
  isDone?: boolean
  isLoading?: boolean
}

const props = withDefaults(defineProps<ConfirmationDialogProps>(), {
  open: false,
  title: 'Confirm',
  body: 'Are you sure you want to proceed?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  isDone: false,
  isLoading: false,
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Dialog :open="open">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        :class="
          cn(
            'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          )
        "
      >
        <div class="flex flex-col space-y-2 text-center sm:text-left">
          <DialogTitle class="text-lg font-semibold">
            {{ title }}
          </DialogTitle>
          <DialogDescription class="text-sm text-muted-foreground">
            {{ body }}
          </DialogDescription>
        </div>
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" @click="handleCancel" :disabled="isLoading">
            {{ cancelText }}
          </Button>
          <Button @click="handleConfirm" :isLoading="isLoading" :disabled="isLoading || isDone">
            {{ confirmText }}
          </Button>
        </div>
      </DialogContent>
    </DialogPortal>
  </Dialog>
</template>
