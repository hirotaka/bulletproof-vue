import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Textarea } from './'
import { Form } from '../form'
import { Button } from '../button'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Components/UI/Textarea',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    autoResize: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

const formSchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const Default: Story = {
  render: (args) => ({
    components: { Textarea, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Textarea v-bind="args" />
              <Button type="submit" :is-loading="isSubmitting">
                Submit
              </Button>
            </div>
          </template>
        </Form>

        <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 class="font-semibold mb-2">Submitted Data:</h3>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message',
    rows: 3,
  },
}

export const WithAutoResize: Story = {
  render: (args) => ({
    components: { Textarea, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Textarea v-bind="args" />
              <Button type="submit" :is-loading="isSubmitting">
                Submit
              </Button>
            </div>
          </template>
        </Form>

        <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 class="font-semibold mb-2">Submitted Data:</h3>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>

        <p class="text-sm text-gray-500 mt-2">
          The textarea will automatically resize as you type.
        </p>
      </div>
    `,
  }),
  args: {
    name: 'message',
    label: 'Message with Auto-Resize',
    placeholder: 'Start typing and watch the textarea grow...',
    rows: 3,
    autoResize: true,
  },
}

export const WithMoreRows: Story = {
  render: (args) => ({
    components: { Textarea, Form, Button },
    setup() {
      const bioSchema = z.object({
        bio: z.string().min(20, 'Bio must be at least 20 characters'),
      })

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, bioSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="bioSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Textarea v-bind="args" />
              <Button type="submit" :is-loading="isSubmitting">
                Submit
              </Button>
            </div>
          </template>
        </Form>

        <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 class="font-semibold mb-2">Submitted Data:</h3>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
  args: {
    name: 'bio',
    label: 'Biography',
    placeholder: 'Tell us about yourself...',
    rows: 6,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Textarea, Form },
    setup() {
      return { args, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema">
          <template #default>
            <Textarea v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message',
    rows: 3,
    disabled: true,
  },
}

export const Readonly: Story = {
  render: (args) => ({
    components: { Textarea, Form },
    setup() {
      return { args, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema" :initial-values="{ message: 'This is a readonly message that cannot be edited.' }">
          <template #default>
            <Textarea v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'message',
    label: 'Message',
    rows: 3,
    readonly: true,
  },
}

export const WithValidationError: Story = {
  render: (args) => ({
    components: { Textarea, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, formSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Textarea v-bind="args" />
              <Button type="submit" :is-loading="isSubmitting">
                Submit
              </Button>
            </div>
          </template>
        </Form>

        <div v-if="submittedData" class="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 class="font-semibold mb-2">Submitted Data:</h3>
          <pre>{{ JSON.stringify(submittedData, null, 2) }}</pre>
        </div>

        <p class="text-sm text-gray-500 mt-2">
          Try submitting with less than 10 characters to see the validation error.
        </p>
      </div>
    `,
  }),
  args: {
    name: 'message',
    label: 'Message',
    placeholder: 'Enter your message (min 10 chars)',
    rows: 3,
  },
}
