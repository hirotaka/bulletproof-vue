import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmationDialog from './ConfirmationDialog.vue'

describe('ConfirmationDialog', () => {
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
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Confirm')
    expect(content).toContain('Are you sure you want to proceed?')
    expect(content).toContain('Cancel')

    wrapper.unmount()
  })

  it('does not render dialog content when open is false', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: false,
      },
    })

    const dialogContent = document.querySelector('[role="dialog"]')
    expect(dialogContent).toBeNull()

    wrapper.unmount()
  })

  it('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const confirmButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Confirm')

    expect(confirmButton).toBeDefined()
    confirmButton?.click()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('confirm')).toHaveLength(1)

    wrapper.unmount()
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const cancelButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Cancel')

    expect(cancelButton).toBeDefined()
    cancelButton?.click()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('cancel')).toHaveLength(1)

    wrapper.unmount()
  })

  it('accepts custom title and body text', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
        title: 'Delete Item',
        body: 'This action cannot be undone.',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Delete Item')
    expect(content).toContain('This action cannot be undone.')

    wrapper.unmount()
  })

  it('accepts custom button text', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
        confirmText: 'Yes',
        cancelText: 'No',
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const content = document.body.textContent
    expect(content).toContain('Yes')
    expect(content).toContain('No')

    wrapper.unmount()
  })

  it('disables buttons when isLoading is true', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
        isLoading: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const confirmButton = Array.from(buttons).find((btn) => btn.textContent?.includes('Confirm'))
    const cancelButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Cancel')

    expect(confirmButton?.hasAttribute('disabled')).toBe(true)
    expect(cancelButton?.hasAttribute('disabled')).toBe(true)

    wrapper.unmount()
  })

  it('disables confirm button when isDone is true', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: {
        open: true,
        isDone: true,
      },
      attachTo: container,
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const buttons = document.querySelectorAll('button')
    const confirmButton = Array.from(buttons).find((btn) => btn.textContent?.trim() === 'Confirm')

    expect(confirmButton?.hasAttribute('disabled')).toBe(true)

    wrapper.unmount()
  })
})
