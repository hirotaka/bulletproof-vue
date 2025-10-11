import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { defineComponent } from 'vue'

import TextareaComponent from './textarea.vue'

// Helper component to wrap Textarea with Form context
const TestWrapper = defineComponent({
  components: { TextareaComponent },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    textareaProps: {
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
      <TextareaComponent v-bind="textareaProps" />
    </form>
  `,
})

describe('Textarea', () => {
  it('renders with label', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          label: 'Message',
        },
      },
    })

    expect(wrapper.text()).toContain('Message')
  })

  it('renders with placeholder', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          placeholder: 'Enter your message',
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('placeholder')).toBe('Enter your message')
  })

  it('renders with custom rows', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          rows: 5,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('rows')).toBe('5')
  })

  it('renders with default rows (3)', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('rows')).toBe('3')
  })

  it('renders as disabled when disabled prop is true', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          disabled: true,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('disabled')).toBeDefined()
  })

  it('renders as readonly when readonly prop is true', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          readonly: true,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('readonly')).toBeDefined()
  })

  it('updates value on input', async () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
        },
      },
    })

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Test message')

    expect((textarea.element as HTMLTextAreaElement).value).toBe('Test message')
  })

  it('displays validation error message', async () => {
    const schema = z.object({
      message: z.string().min(10, 'Message must be at least 10 characters'),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          label: 'Message',
        },
      },
    })

    const textarea = wrapper.find('textarea')

    // Trigger validation by entering invalid value
    await textarea.setValue('short')
    await textarea.trigger('blur')

    // Wait for validation to process with a small delay
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Check if error message is displayed
    expect(wrapper.text()).toContain('Message must be at least 10 characters')
  })

  it('applies custom class', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          class: 'custom-class',
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('custom-class')
  })

  it('has resize-y class by default', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('resize-y')
  })

  it('has resize-none class when autoResize is true', () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          autoResize: true,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('resize-none')
  })

  it('adjusts height on input when autoResize is true', async () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          autoResize: true,
          rows: 2,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    const element = textarea.element as HTMLTextAreaElement

    // Mock scrollHeight
    Object.defineProperty(element, 'scrollHeight', {
      configurable: true,
      value: 120,
    })

    // Input some text
    await textarea.setValue('Line 1\nLine 2\nLine 3\nLine 4')
    await textarea.trigger('input')
    await wrapper.vm.$nextTick()

    // Height should be set to scrollHeight
    expect(element.style.height).toBe('120px')
  })

  it('does not adjust height when autoResize is false', async () => {
    const schema = z.object({
      message: z.string(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
          autoResize: false,
          rows: 2,
        },
      },
    })

    const textarea = wrapper.find('textarea')
    const element = textarea.element as HTMLTextAreaElement

    // Input some text
    await textarea.setValue('Line 1\nLine 2\nLine 3\nLine 4')
    await textarea.trigger('input')
    await wrapper.vm.$nextTick()

    // Height should not be automatically adjusted
    expect(element.style.height).toBe('')
  })

  it('integrates with VeeValidate field', async () => {
    const schema = z.object({
      message: z.string().min(5, 'Too short'),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        textareaProps: {
          name: 'message',
        },
      },
    })

    const textarea = wrapper.find('textarea')

    // Enter invalid message
    await textarea.setValue('Hi')
    await textarea.trigger('blur')

    // Wait for validation to process with a small delay
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be displayed
    expect(wrapper.text()).toContain('Too short')

    // Enter valid message
    await textarea.setValue('Hello World')
    await textarea.trigger('blur')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be gone
    expect(wrapper.text()).not.toContain('Too short')
  })
})
