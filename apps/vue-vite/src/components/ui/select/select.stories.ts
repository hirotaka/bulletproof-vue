import type { Meta, StoryObj } from '@storybook/vue3'
import { z } from 'zod'
import { ref } from 'vue'

import { Select, type Option } from './'
import { Form } from '../form'
import { Button } from '../button'

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Components/UI/Select',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof Select>

const formSchema = z.object({
  country: z.string().min(1, 'Please select a country'),
})

const countries: Option[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
]

export const Default: Story = {
  render: (args) => ({
    components: { Select, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, countries, formSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Select v-bind="args" />
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
    name: 'country',
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
}

export const WithInitialValue: Story = {
  render: (args) => ({
    components: { Select, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, countries, formSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" :initial-values="{ country: 'jp' }" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Select v-bind="args" />
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
    name: 'country',
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Select, Form },
    setup() {
      return { args, countries, formSchema }
    },
    template: `
      <div class="max-w-md">
        <Form :schema="formSchema">
          <template #default>
            <Select v-bind="args" />
          </template>
        </Form>
      </div>
    `,
  }),
  args: {
    name: 'country',
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
    disabled: true,
  },
}

export const WithValidationError: Story = {
  render: (args) => ({
    components: { Select, Form, Button },
    setup() {
      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return { args, handleSubmit, submittedData, countries, formSchema }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="formSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Select v-bind="args" />
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
          Try submitting without selecting a country to see the validation error.
        </p>
      </div>
    `,
  }),
  args: {
    name: 'country',
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
}

export const MultipleSelectsInForm: Story = {
  render: (args) => ({
    components: { Select, Form, Button },
    setup() {
      const multiFormSchema = z.object({
        country: z.string().min(1, 'Please select a country'),
        language: z.string().min(1, 'Please select a language'),
      })

      const languages: Option[] = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Japanese', value: 'ja' },
      ]

      const submittedData = ref<Record<string, unknown> | null>(null)

      const handleSubmit = (values: Record<string, unknown>) => {
        submittedData.value = values
        console.log('Form submitted:', values)
      }

      return {
        args,
        handleSubmit,
        submittedData,
        countries,
        languages,
        multiFormSchema,
      }
    },
    template: `
      <div class="max-w-md space-y-4">
        <Form :schema="multiFormSchema" @submit="handleSubmit">
          <template #default="{ isSubmitting }">
            <div class="space-y-4">
              <Select name="country" label="Country" placeholder="Select a country" :options="countries" />
              <Select name="language" label="Language" placeholder="Select a language" :options="languages" />
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
    name: 'country',
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
}
