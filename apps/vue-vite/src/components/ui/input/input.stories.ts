import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Input } from './'
import { Form } from '../form'
import { Button } from '../button'

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/UI/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

const formSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
})

export const Default: Story = {
  render: (args) => ({
    components: { Input, Form, Button },
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
              <Input v-bind="args" />
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
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
  },
}

export const WithEmail: Story = {
  render: (args) => ({
    components: { Input, Form, Button },
    setup() {
      const emailSchema = z.object({
        email: z.string().email('Invalid email address'),
      })

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, emailSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="emailSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Input v-bind="args" />
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
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
}

export const WithPassword: Story = {
  render: (args) => ({
    components: { Input, Form, Button },
    setup() {
      const passwordSchema = z.object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
      })

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, passwordSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="passwordSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Input v-bind="args" />
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
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Input, Form },
    setup() {
      return { args, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema">
          <template #default>
            <Input v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    disabled: true,
  },
}

export const Readonly: Story = {
  render: (args) => ({
    components: { Input, Form },
    setup() {
      return { args, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema" :initial-values="{ username: 'johndoe' }">
          <template #default>
            <Input v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'username',
    label: 'Username',
    type: 'text',
    readonly: true,
  },
}

export const WithValidationError: Story = {
  render: (args) => ({
    components: { Input, Form, Button },
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
              <Input v-bind="args" />
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
          Try submitting with less than 3 characters to see the validation error.
        </p>
      </div>
    `,
  }),
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter your username (min 3 chars)',
    type: 'text',
  },
}
