import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Checkbox } from './'
import { Form } from '../form'
import { Button } from '../button'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/UI/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const formSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox, Form, Button },
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
              <Checkbox v-bind="args" />
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
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
  },
}

export const WithoutLabel: Story = {
  render: (args) => ({
    components: { Checkbox, Form },
    setup() {
      const simpleSchema = z.object({
        checked: z.boolean(),
      })

      return { args, simpleSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="simpleSchema">
          <template #default>
            <Checkbox v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'checked',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Checkbox, Form },
    setup() {
      const simpleSchema = z.object({
        acceptTerms: z.boolean(),
      })

      return { args, simpleSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="simpleSchema">
          <template #default>
            <Checkbox v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  render: (args) => ({
    components: { Checkbox, Form },
    setup() {
      const simpleSchema = z.object({
        acceptTerms: z.boolean(),
      })

      return { args, simpleSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="simpleSchema" :initial-values="{ acceptTerms: true }">
          <template #default>
            <Checkbox v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    disabled: true,
  },
}

export const WithValidationError: Story = {
  render: (args) => ({
    components: { Checkbox, Form, Button },
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
              <Checkbox v-bind="args" />
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
          Try submitting without checking the box to see the validation error.
        </p>
      </div>
    `,
  }),
  args: {
    name: 'acceptTerms',
    label: 'I accept the terms and conditions',
  },
}

export const MultipleCheckboxes: Story = {
  render: () => ({
    components: { Checkbox, Form, Button },
    setup() {
      const multiSchema = z.object({
        newsletter: z.boolean(),
        marketing: z.boolean(),
        security: z.boolean().refine((val) => val === true, {
          message: 'You must accept security updates',
        }),
      })

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { multiSchema, handleSubmit, submittedData }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="multiSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <div class="space-y-3">
                <Checkbox name="newsletter" label="Subscribe to newsletter" />
                <Checkbox name="marketing" label="Receive marketing emails" />
                <Checkbox name="security" label="Receive security updates (required)" />
              </div>
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
}
