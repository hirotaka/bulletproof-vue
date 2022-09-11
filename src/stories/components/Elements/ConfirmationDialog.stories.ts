import ConfirmationDialog from "@/components/Elements/ConfirmationDialog.vue";
import { BaseButton } from "@/components/Elements";

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
};

const Template = (args) => ({
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

const AsInfoTemplate = (args) => ({
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
