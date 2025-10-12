import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FormDrawer from './FormDrawer.vue'

describe('FormDrawer', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('renders with default props when open', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Test Form')
    expect(content).toContain('Close')
    expect(content).toContain('Submit')

    wrapper.unmount()
  })

  it('does not render drawer content when open is false', () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: false,
        title: 'Test Form',
      },
    })

    const drawerContent = document.querySelector('[role="dialog"]')
    expect(drawerContent).toBeNull()

    wrapper.unmount()
  })

  it('emits submit event when submit button is clicked', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const submitButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Submit')

    expect(submitButton).toBeDefined()
    submitButton?.click()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')).toHaveLength(1)

    wrapper.unmount()
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const closeButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Close')

    expect(closeButton).toBeDefined()
    closeButton?.click()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('update:open')).toBeTruthy()

    wrapper.unmount()
  })

  it('accepts custom submitText', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
        submitText: 'Save Changes',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Save Changes')

    wrapper.unmount()
  })

  it('displays loading state on submit button when isLoading is true', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
        isLoading: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const submitButton = Array.from(buttons).find((btn) =>
      btn.textContent?.includes('Submit'),
    )

    expect(submitButton?.hasAttribute('disabled')).toBe(true)

    wrapper.unmount()
  })

  it('closes drawer when isDone becomes true', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
        isDone: false,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Update isDone to true
    await wrapper.setProps({ isDone: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()

    const lastEmit = wrapper.emitted('update:open')
    expect(lastEmit?.[lastEmit.length - 1]).toEqual([false])

    wrapper.unmount()
  })

  it('renders slot content', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: true,
        title: 'Test Form',
      },
      slots: {
        default: '<div class="test-content">Form Content</div>',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Form Content')

    wrapper.unmount()
  })

  it('renders trigger slot content', async () => {
    const wrapper = mount(FormDrawer, {
      props: {
        open: false,
        title: 'Test Form',
      },
      slots: {
        trigger: '<button class="test-trigger">Open Drawer</button>',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('Open Drawer')

    wrapper.unmount()
  })
})
