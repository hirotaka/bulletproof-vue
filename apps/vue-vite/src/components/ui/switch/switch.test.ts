import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { defineComponent } from 'vue'

import SwitchComponent from './switch.vue'

// Helper component to wrap Switch with Form context
const TestWrapper = defineComponent({
  components: { SwitchComponent },
  props: {
    schema: {
      type: Object,
      required: true,
    },
    switchProps: {
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
      <SwitchComponent v-bind="switchProps" />
    </form>
  `,
})

describe('Switch', () => {
  it('renders with label', () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
          label: 'Enable notifications',
        },
      },
    })

    expect(wrapper.text()).toContain('Enable notifications')
  })

  it('renders as disabled when disabled prop is true', () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
          disabled: true,
        },
      },
    })

    const switchRoot = wrapper.find('[role="switch"]')
    expect(switchRoot.attributes('data-disabled')).toBeDefined()
  })

  it('toggles checked state on click', async () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
        },
      },
    })

    const switchRoot = wrapper.find('[role="switch"]')

    // Initially unchecked
    expect(switchRoot.attributes('data-state')).toBe('unchecked')

    // Click to toggle
    await switchRoot.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be checked now
    expect(switchRoot.attributes('data-state')).toBe('checked')

    // Click again to toggle
    await switchRoot.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be unchecked again
    expect(switchRoot.attributes('data-state')).toBe('unchecked')
  })

  it('applies custom class', () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
          class: 'custom-class',
        },
      },
    })

    const switchRoot = wrapper.find('[role="switch"]')
    expect(switchRoot.classes()).toContain('custom-class')
  })

  it('integrates with VeeValidate field', async () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
        },
      },
    })

    const switchRoot = wrapper.find('[role="switch"]')

    // Initially unchecked (false)
    expect(switchRoot.attributes('data-state')).toBe('unchecked')

    // Toggle to checked (true)
    await switchRoot.trigger('click')
    await wrapper.vm.$nextTick()

    // Should be checked now
    expect(switchRoot.attributes('data-state')).toBe('checked')
  })

  it('supports initial value through form context', async () => {
    const TestWrapperWithInitialValue = defineComponent({
      components: { SwitchComponent },
      props: {
        schema: {
          type: Object,
          required: true,
        },
        switchProps: {
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
          <SwitchComponent v-bind="switchProps" />
        </form>
      `,
    })

    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapperWithInitialValue, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
        },
        initialValues: {
          notifications: true,
        },
      },
    })

    // Wait for component to mount and initialize
    await wrapper.vm.$nextTick()

    const switchRoot = wrapper.find('[role="switch"]')
    expect(switchRoot.attributes('data-state')).toBe('checked')
  })

  it('handles disabled state correctly', async () => {
    const schema = z.object({
      notifications: z.boolean(),
    })

    const wrapper = mount(TestWrapper, {
      props: {
        schema,
        switchProps: {
          name: 'notifications',
          disabled: true,
        },
      },
    })

    const switchRoot = wrapper.find('[role="switch"]')

    // Should be disabled
    expect(switchRoot.attributes('data-disabled')).toBeDefined()

    // Try to toggle (should not work)
    await switchRoot.trigger('click')
    await wrapper.vm.$nextTick()

    // Should still be unchecked
    expect(switchRoot.attributes('data-state')).toBe('unchecked')
  })
})
