import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from './'

const meta: Meta<typeof ConfirmationDialog> = {
  component: ConfirmationDialog,
  render: (args) => ({
    components: { ConfirmationDialog, Button },
    setup() {
      const isOpen = ref(false)
      const isLoading = ref(false)

      const handleConfirm = async () => {
        isLoading.value = true
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000))
        isLoading.value = false
        isOpen.value = false
        console.log('Confirmed')
      }

      const handleCancel = () => {
        isOpen.value = false
        console.log('Cancelled')
      }

      return { args, isOpen, isLoading, handleConfirm, handleCancel }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Confirmation Dialog</Button>
        <ConfirmationDialog
          v-bind="args"
          :open="isOpen"
          :isLoading="isLoading"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </div>
    `,
  }),
}

export default meta

type Story = StoryObj<typeof ConfirmationDialog>

export const Default: Story = {
  args: {
    title: 'Confirm Action',
    body: 'Are you sure you want to proceed with this action?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  },
}

export const DeleteConfirmation: Story = {
  args: {
    title: 'Delete Item',
    body: 'This action cannot be undone. Are you sure you want to delete this item?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
  },
}

export const CustomText: Story = {
  args: {
    title: 'Save Changes',
    body: 'Do you want to save your changes before leaving?',
    confirmText: 'Save',
    cancelText: 'Discard',
  },
}
