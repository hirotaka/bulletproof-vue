import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'

import { FormDrawer } from './'

const meta: Meta<typeof FormDrawer> = {
  component: FormDrawer,
  render: (args) => ({
    components: {
      Button,
      DrawerTrigger,
      FormDrawer,
    },
    setup() {
      const isOpen = ref(false)
      const isLoading = ref(false)
      const isDone = ref(false)

      const handleSubmit = () => {
        isLoading.value = true
        // Simulate API call
        setTimeout(() => {
          isLoading.value = false
          isDone.value = true
          // Reset isDone after drawer closes
          setTimeout(() => {
            isDone.value = false
          }, 100)
        }, 1500)
      }

      const handleClose = () => {
        isOpen.value = false
      }

      return { isOpen, isLoading, isDone, handleSubmit, handleClose, args }
    },
    template: `
      <FormDrawer
        :open="isOpen"
        @update:open="(val) => isOpen = val"
        :title="args.title"
        :submitText="args.submitText"
        :isLoading="isLoading"
        :isDone="isDone"
        @submit="handleSubmit"
        @close="handleClose"
      >
        <template #trigger>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Form Drawer</Button>
          </DrawerTrigger>
        </template>
        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div class="space-y-2">
            <label for="message" class="text-sm font-medium">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Enter your message"
              class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ></textarea>
          </div>
        </div>
      </FormDrawer>
    `,
  }),
}

export default meta

type Story = StoryObj<typeof FormDrawer>

export const Default: Story = {
  args: {
    title: 'Create New Item',
    submitText: 'Submit',
  },
}

export const CustomSubmitText: Story = {
  args: {
    title: 'Edit Profile',
    submitText: 'Save Changes',
  },
}

export const LongForm: Story = {
  args: {
    title: 'Complete Registration',
    submitText: 'Register',
  },
}
