import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Form } from './'
import { Button } from '../button'

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Components/UI/Form',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const Basic: Story = {
  render: (args) => ({
    components: { Form, Button },
    setup() {
      const submittedData = ref<any>(null)

      const handleSubmit = (values: any) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form v-bind="args" @submit="handleSubmit">
          <template #default="{ errors, isSubmitting }">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="w-full px-3 py-2 border rounded-md"
                  :class="errors.email ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="w-full px-3 py-2 border rounded-md"
                  :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
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
  args: {
    schema: loginSchema,
    initialValues: {
      email: '',
      password: '',
    },
  },
}

export const WithInitialValues: Story = {
  render: (args) => ({
    components: { Form, Button },
    setup() {
      const submittedData = ref<any>(null)

      const handleSubmit = (values: any) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form v-bind="args" @submit="handleSubmit">
          <template #default="{ errors, isSubmitting }">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="w-full px-3 py-2 border rounded-md"
                  :class="errors.email ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="w-full px-3 py-2 border rounded-md"
                  :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                />
                <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
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
  args: {
    schema: loginSchema,
    initialValues: {
      email: 'test@example.com',
      password: 'password123',
    },
  },
}
