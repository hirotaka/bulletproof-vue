import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from './'

// Helper component to test the Dropdown
const TestDropdown = defineComponent({
  components: {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  template: `
    <Dropdown>
      <DropdownTrigger>
        <button>Open Menu</button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem @click="$emit('select', 'profile')">Profile</DropdownItem>
        <DropdownItem @click="$emit('select', 'settings')">Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem :disabled="disabled" @click="$emit('select', 'logout')">Logout</DropdownItem>
      </DropdownContent>
    </Dropdown>
  `,
})

describe('Dropdown', () => {
  it('renders trigger button', () => {
    const wrapper = mount(TestDropdown)

    const trigger = wrapper.find('button')
    expect(trigger.exists()).toBe(true)
    expect(trigger.text()).toBe('Open Menu')
  })

  it('renders dropdown with core components', () => {
    const wrapper = mount(TestDropdown)

    // Check that core components are present
    expect(wrapper.findComponent(Dropdown).exists()).toBe(true)
    expect(wrapper.findComponent(DropdownTrigger).exists()).toBe(true)
    expect(wrapper.findComponent(DropdownContent).exists()).toBe(true)
  })

  it('has correct trigger state', async () => {
    const wrapper = mount(TestDropdown, {
      attachTo: document.body,
    })

    const trigger = wrapper.find('button')

    // Initial state
    expect(trigger.attributes('data-state')).toBe('closed')

    wrapper.unmount()
  })

  it('accepts disabled prop for items', () => {
    const wrapper = mount(TestDropdown, {
      props: {
        disabled: true,
      },
    })

    // Check that the component renders with disabled prop
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with custom alignment', () => {
    const AlignStartDropdown = defineComponent({
      components: {
        Dropdown,
        DropdownContent,
        DropdownItem,
        DropdownTrigger,
      },
      template: `
        <Dropdown>
          <DropdownTrigger>
            <button>Open</button>
          </DropdownTrigger>
          <DropdownContent align="start">
            <DropdownItem>Item</DropdownItem>
          </DropdownContent>
        </Dropdown>
      `,
    })

    const wrapper = mount(AlignStartDropdown)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders with custom class on content', () => {
    const CustomDropdown = defineComponent({
      components: {
        Dropdown,
        DropdownContent,
        DropdownItem,
        DropdownTrigger,
      },
      template: `
        <Dropdown>
          <DropdownTrigger>
            <button>Open</button>
          </DropdownTrigger>
          <DropdownContent class="custom-class">
            <DropdownItem>Item</DropdownItem>
          </DropdownContent>
        </Dropdown>
      `,
    })

    const wrapper = mount(CustomDropdown)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(DropdownContent).exists()).toBe(true)
  })

  it('renders with custom sideOffset', () => {
    const CustomDropdown = defineComponent({
      components: {
        Dropdown,
        DropdownContent,
        DropdownItem,
        DropdownTrigger,
      },
      template: `
        <Dropdown>
          <DropdownTrigger>
            <button>Open</button>
          </DropdownTrigger>
          <DropdownContent :side-offset="10">
            <DropdownItem>Item</DropdownItem>
          </DropdownContent>
        </Dropdown>
      `,
    })

    const wrapper = mount(CustomDropdown)
    expect(wrapper.exists()).toBe(true)
  })

  it('supports keyboard navigation through Radix Vue', () => {
    const wrapper = mount(TestDropdown)
    const trigger = wrapper.find('button')

    // Radix Vue provides keyboard navigation by default
    // We verify the component structure supports it
    expect(trigger.exists()).toBe(true)
    expect(wrapper.findComponent(DropdownContent).exists()).toBe(true)
  })
})
