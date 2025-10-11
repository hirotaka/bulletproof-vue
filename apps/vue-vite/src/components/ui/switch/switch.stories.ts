import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Switch } from './'
import { Form } from '../form'
import { Button } from '../button'

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/UI/Switch',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

const formSchema = z.object({
  notifications: z.boolean(),
})

export const Default: Story = {
  render: (args) => ({
    components: { Switch, Form, Button },
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
              <Switch v-bind="args" />
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
    name: 'notifications',
    label: 'Enable notifications',
  },
}

export const WithInitialValue: Story = {
  render: (args) => ({
    components: { Switch, Form, Button },
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
        <Form :schema="formSchema" :initial-values="{ notifications: true }" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Switch v-bind="args" />
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
    name: 'notifications',
    label: 'Enable notifications',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Switch, Form },
    setup() {
      return { args, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema">
          <template #default>
            <Switch v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'notifications',
    label: 'Enable notifications',
    disabled: true,
  },
}

export const Multiple: Story = {
  render: (args) => ({
    components: { Switch, Form, Button },
    setup() {
      const multipleSchema = z.object({
        emailNotifications: z.boolean(),
        pushNotifications: z.boolean(),
        smsNotifications: z.boolean(),
      })

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, multipleSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="multipleSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Switch name="emailNotifications" label="Email Notifications" />
              <Switch name="pushNotifications" label="Push Notifications" />
              <Switch name="smsNotifications" label="SMS Notifications" />
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
  args: {},
}
