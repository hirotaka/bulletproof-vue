import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { defineComponent } from 'vue'

import InputComponent from './input.vue'

// Helper component to wrap Input with Form context
const TestWrapper = defineComponent({
  components: { InputComponent },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    inputProps: {
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
      <InputComponent v-bind="inputProps" />
    </form>
  `,
})

describe('Input', () => {
  it('renders with label', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          label: 'Username',
        },
      },
    })

    expect(wrapper.text()).toContain('Username')
  })

  it('renders with placeholder', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          placeholder: 'Enter your username',
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter your username')
  })

  it('renders different input types', () => {
    const schema = z.object({
      email: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'email',
          type: 'email',
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('email')
  })

  it('renders as disabled when disabled prop is true', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          disabled: true,
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders as readonly when readonly prop is true', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          readonly: true,
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('readonly')).toBeDefined()
  })

  it('updates value on input', async () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
        },
      },
    })

    const input = wrapper.find('input')
    await input.setValue('testuser')

    expect((input.element as HTMLInputElement).value).toBe('testuser')
  })

  it('displays validation error message', async () => {
    const schema = z.object({
      username: z.string().min(3, 'Username must be at least 3 characters'),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          label: 'Username',
        },
      },
    })

    const input = wrapper.find('input')

    // Trigger validation by entering invalid value
    await input.setValue('ab')
    await input.trigger('blur')

    // Wait for validation to process - increased delay for CI stability
    await new Promise((resolve) => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    // Check if error message is displayed
    expect(wrapper.text()).toContain('Username must be at least 3 characters')
  })

  it('applies custom class', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
          class: 'custom-class',
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('custom-class')
  })

  it('has proper default type', () => {
    const schema = z.object({
      username: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'username',
        },
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
  })

  it('integrates with VeeValidate field', async () => {
    const schema = z.object({
      email: z.string().email('Invalid email'),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        inputProps: {
          name: 'email',
        },
      },
    })

    const input = wrapper.find('input')

    // Enter invalid email
    await input.setValue('invalid-email')
    await input.trigger('blur')

    // Wait for validation to process with a small delay
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be displayed
    expect(wrapper.text()).toContain('Invalid email')

    // Enter valid email
    await input.setValue('test@example.com')
    await input.trigger('blur')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be gone
    expect(wrapper.text()).not.toContain('Invalid email')
  })
})
