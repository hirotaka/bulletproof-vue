import { ConfirmationDialog } from ".";
import { BaseButton } from "@/components/Elements";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Elements/ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    icon: {
      control: "radio",
      options: ["danger", "info"],
    },
    title: {
      control: "text",
    },
    body: {
      control: "text",
    },
  },
} as Meta<typeof ConfirmationDialog>;

const Template: StoryFn<typeof ConfirmationDialog> = (args) => ({
  components: { ConfirmationDialog, BaseButton },
  setup() {
    return { args };
  },
  template: `
    <ConfirmationDialog v-bind="args">
      <template #triggerButton>
        <BaseButton>Open</BaseButton>
      </template>
      <template #confirmButton>
        <BaseButton class="bg-red-500">Confirm</BaseButton>
      </template>
    </ConfirmationDialog>
  `,
});

export const Danger = Template.bind({});
Danger.args = {
  icon: "danger",
  title: "Confirmation",
  body: "Hello World",
};

const AsInfoTemplate: StoryFn<typeof ConfirmationDialog> = (args) => ({
  components: { ConfirmationDialog, BaseButton },
  setup() {
    return { args };
  },
  template: `
    <ConfirmationDialog v-bind="args">
      <template #triggerButton>
        <BaseButton>Open</BaseButton>
      </template>
      <template #confirmButton>
        <BaseButton>Confirm</BaseButton>
      </template>
    </ConfirmationDialog>
  `,
});

export const Info = AsInfoTemplate.bind({});
Info.args = {
  icon: "info",
  title: "Confirmation",
  body: "Hello World",
};
