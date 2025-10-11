import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { defineComponent } from 'vue'

import CheckboxComponent from './Checkbox.vue'

// Helper component to wrap Checkbox with Form context
const TestWrapper = defineComponent({
  components: { CheckboxComponent },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    checkboxProps: {
      type: Object,
      default: () => ({}),
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const validationSchema = toTypedSchema(props.schema as z.ZodSchema)
    const form = useForm({
      validationSchema,
      initialValues: props.initialValues,
    })

    return { form }
  },
  template: `
    <form @submit="form.handleSubmit(() => {})">
      <CheckboxComponent v-bind="checkboxProps" />
    </form>
  `,
})

describe('Checkbox', () => {
  it('renders with label', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms and conditions',
        },
      },
    })

    expect(wrapper.text()).toContain('Accept terms and conditions')
  })

  it('renders without label', () => {
    const schema = z.object({
      checked: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'checked',
        },
      },
    })

    // Find the checkbox button element
    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.exists()).toBe(true)
  })

  it('renders as disabled when disabled prop is true', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
          disabled: true,
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.attributes('disabled')).toBeDefined()
  })

  it('toggles checked state on click', async () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')

    // Initial state should be unchecked
    expect(checkbox.attributes('data-state')).toBe('unchecked')

    // Click to check
    await checkbox.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be checked now
    expect(checkbox.attributes('data-state')).toBe('checked')

    // Click again to uncheck
    await checkbox.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be unchecked again
    expect(checkbox.attributes('data-state')).toBe('unchecked')
  })

  it('displays validation error message', async () => {
    const schema = z.object({
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms',
      }),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
        },
      },
    })

    const form = wrapper.find('form')

    // Try to submit without checking
    await form.trigger('submit')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Check if error message is displayed
    expect(wrapper.text()).toContain('You must accept the terms')
  })

  it('clears validation error when checkbox is checked', async () => {
    const schema = z.object({
      acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms',
      }),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
        },
      },
    })

    const form = wrapper.find('form')
    const checkbox = wrapper.find('button[role="checkbox"]')

    // Try to submit without checking
    await form.trigger('submit')

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be displayed
    expect(wrapper.text()).toContain('You must accept the terms')

    // Check the checkbox
    await checkbox.trigger('click')
    await wrapper.vm.$nextTick()

    // Wait for validation to process
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Error should be gone
    expect(wrapper.text()).not.toContain('You must accept the terms')
  })

  it('applies custom class', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          class: 'custom-class',
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.classes()).toContain('custom-class')
  })

  it('uses custom id when provided', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
          id: 'custom-id',
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.attributes('id')).toBe('custom-id')
  })

  it('uses name as id when custom id is not provided', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.attributes('id')).toBe('acceptTerms')
  })

  it('integrates with VeeValidate field', async () => {
    const schema = z.object({
      newsletter: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'newsletter',
          label: 'Subscribe to newsletter',
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')

    // Initial state
    expect(checkbox.attributes('data-state')).toBe('unchecked')

    // Check the checkbox
    await checkbox.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be checked
    expect(checkbox.attributes('data-state')).toBe('checked')
  })

  it('respects initial values', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        checkboxProps: {
          name: 'acceptTerms',
          label: 'Accept terms',
        },
        initialValues: {
          acceptTerms: true,
        },
      },
    })

    const checkbox = wrapper.find('button[role="checkbox"]')
    expect(checkbox.attributes('data-state')).toBe('checked')
  })
})
