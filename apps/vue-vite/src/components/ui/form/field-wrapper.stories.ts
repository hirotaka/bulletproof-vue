import type { Meta, StoryObj } from '@storybook/vue3'
import { Input } from '../input'
import { FieldWrapper } from './'

const meta: Meta<typeof FieldWrapper> = {
  component: FieldWrapper,
  title: 'Components/UI/FieldWrapper',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<typeof FieldWrapper>

export const Default: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text..."
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    label: 'Username',
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text..."
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    label: 'Username',
    description: 'This is a helpful description for the field',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text..."
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    label: 'Email',
    required: true,
    description: 'Your email address is required',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text..."
            class="w-full rounded-md border border-red-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    label: 'Username',
    error: 'Username must be at least 3 characters',
  },
}

export const WithAllProps: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text..."
            class="w-full rounded-md border border-red-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    label: 'Password',
    required: true,
    description: 'Password must be at least 8 characters',
    error: 'Password is too short',
  },
}

export const NoLabel: Story = {
  render: (args) => ({
    components: { FieldWrapper, Input },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-md">
        <FieldWrapper v-bind="args">
          <input
            type="text"
            placeholder="Enter text without label..."
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FieldWrapper>
      </div>
    `,
  }),
  args: {
    description: 'This field has no label',
  },
}
