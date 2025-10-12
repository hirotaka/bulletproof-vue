import type { Meta, StoryObj } from '@storybook/vue3'

import { Button } from '@/components/ui/button'

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from './'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  render: (args) => ({
    components: {
      Button,
      Dropdown,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownTrigger,
    },
    setup() {
      const handleSelect = (value: string) => {
        console.log('Selected:', value)
      }

      return { args, handleSelect }
    },
    template: `
      <Dropdown>
        <DropdownTrigger as-child>
          <Button variant="outline">Open Menu</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem @click="handleSelect('profile')">Profile</DropdownItem>
          <DropdownItem @click="handleSelect('settings')">Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem @click="handleSelect('logout')">Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>
    `,
  }),
}

export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {}

export const WithDisabledItem: Story = {
  render: () => ({
    components: {
      Button,
      Dropdown,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownTrigger,
    },
    setup() {
      const handleSelect = (value: string) => {
        console.log('Selected:', value)
      }

      return { handleSelect }
    },
    template: `
      <Dropdown>
        <DropdownTrigger as-child>
          <Button variant="outline">Open Menu</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem @click="handleSelect('profile')">Profile</DropdownItem>
          <DropdownItem disabled>Settings (Disabled)</DropdownItem>
          <DropdownSeparator />
          <DropdownItem @click="handleSelect('logout')">Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>
    `,
  }),
}

export const WithMultipleSections: Story = {
  render: () => ({
    components: {
      Button,
      Dropdown,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownTrigger,
    },
    setup() {
      const handleSelect = (value: string) => {
        console.log('Selected:', value)
      }

      return { handleSelect }
    },
    template: `
      <Dropdown>
        <DropdownTrigger as-child>
          <Button variant="outline">Open Menu</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem @click="handleSelect('new-tab')">New Tab</DropdownItem>
          <DropdownItem @click="handleSelect('new-window')">New Window</DropdownItem>
          <DropdownSeparator />
          <DropdownItem @click="handleSelect('history')">History</DropdownItem>
          <DropdownItem @click="handleSelect('downloads')">Downloads</DropdownItem>
          <DropdownSeparator />
          <DropdownItem @click="handleSelect('settings')">Settings</DropdownItem>
          <DropdownItem @click="handleSelect('help')">Help</DropdownItem>
        </DropdownContent>
      </Dropdown>
    `,
  }),
}

export const AlignStart: Story = {
  render: () => ({
    components: {
      Button,
      Dropdown,
      DropdownContent,
      DropdownItem,
      DropdownSeparator,
      DropdownTrigger,
    },
    setup() {
      const handleSelect = (value: string) => {
        console.log('Selected:', value)
      }

      return { handleSelect }
    },
    template: `
      <Dropdown>
        <DropdownTrigger as-child>
          <Button variant="outline">Open Menu (Align Start)</Button>
        </DropdownTrigger>
        <DropdownContent align="start">
          <DropdownItem @click="handleSelect('profile')">Profile</DropdownItem>
          <DropdownItem @click="handleSelect('settings')">Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem @click="handleSelect('logout')">Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>
    `,
  }),
}
