import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { defineComponent } from 'vue'

import SelectComponent from './select.vue'
import type { Option } from './select.vue'

// Helper component to wrap Select with Form context
const TestWrapper = defineComponent({
  components: {
    SelectComponent,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    selectProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const validationSchema = toTypedSchema(props.schema as z.ZodSchema)
    const form = useForm({
      validationSchema,
    })

    return { form }
  },
  template: `
    <form @submit="form.handleSubmit(() => {})">
      <SelectComponent v-bind="selectProps" />
    </form>
  `,
})

const mockOptions: Option[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
]

describe('Select', () => {
  it('renders with label', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          label: 'Choose an option',
          options: mockOptions,
        },
      },
    })

    expect(wrapper.text()).toContain('Choose an option')
  })

  it('renders with placeholder', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          placeholder: 'Select an option',
          options: mockOptions,
        },
      },
    })

    expect(wrapper.text()).toContain('Select an option')
  })

  it('renders all options', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
        },
      },
    })

    // Check if all option labels are present
    mockOptions.forEach((option) => {
      expect(wrapper.text()).toContain(option.label)
    })
  })

  it('renders as disabled when disabled prop is true', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
          disabled: true,
        },
      },
    })

    const select = wrapper.find('select')
    expect(select.attributes('disabled')).toBeDefined()
  })

  it('displays validation error message', async () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          label: 'Choice',
          options: mockOptions,
        },
      },
    })

    const select = wrapper.find('select')

    // Set an invalid value (empty string) - zod will show "Required" for empty strings
    await select.setValue('')
    await select.trigger('blur')

    // Wait for validation to process - increased delay for CI stability
    await new Promise((resolve) => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    // Check if error message is displayed (zod's default empty string message)
    expect(wrapper.text()).toContain('Required')
  })

  it('applies custom class', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
          class: 'custom-select-class',
        },
      },
    })

    const select = wrapper.find('select')
    expect(select.classes()).toContain('custom-select-class')
  })

  it('integrates with VeeValidate field', async () => {
    const schema = z.object({
      country: z.enum(['opt1', 'opt2', 'opt3'], {
        errorMap: () => ({ message: 'Country is required' }),
      }),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'country',
          options: mockOptions,
        },
      },
    })

    const select = wrapper.find('select')

    // Set an invalid value
    await select.setValue('invalid')
    await select.trigger('blur')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be displayed
    expect(wrapper.text()).toContain('Country is required')

    // Now set a valid value
    await select.setValue('opt1')
    await select.trigger('blur')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be gone
    expect(wrapper.text()).not.toContain('Country is required')
  })

  it('accepts numeric values', () => {
    const schema = z.object({
      choice: z.number(),
    })

    const numericOptions: Option[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 },
    ]

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: numericOptions,
        },
      },
    })

    // Check if numeric options are rendered
    numericOptions.forEach((option) => {
      expect(wrapper.text()).toContain(option.label)
    })
  })

  it('renders native select element', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
          placeholder: 'Select...',
        },
      },
    })

    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })

  it('renders option elements for each option', () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
        },
      },
    })

    const options = wrapper.findAll('option')
    // mockOptions length + 1 for placeholder option (if present)
    expect(options.length).toBeGreaterThanOrEqual(mockOptions.length)
  })

  it('can select an option', async () => {
    const schema = z.object({
      choice: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        selectProps: {
          name: 'choice',
          options: mockOptions,
        },
      },
    })

    const select = wrapper.find('select')
    await select.setValue('opt2')

    expect((select.element as HTMLSelectElement).value).toBe('opt2')
  })
})
