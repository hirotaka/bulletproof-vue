import type { Meta, StoryFn } from "@storybook/vue3";
import { ToastNotification, icons } from "@/components/Notifications";

export default {
  title: "Components/ToastNotification",
  component: ToastNotification,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    id: {
      control: { type: "text" },
    },
    type: {
      control: { type: "radio" },
      options: Object.keys(icons),
    },
    title: {
      control: { type: "string" },
    },
    message: {
      control: { type: "string" },
    },
    onConfirmed: {},
  },
} as Meta<typeof ToastNotification>;

const Template: StoryFn<typeof ToastNotification> = (args) => ({
  components: { ToastNotification },
  setup() {
    return { args };
  },
  template: '<ToastNotification v-bind="{ notification: args }" />',
});

export const Info = Template.bind({});
Info.args = {
  id: "1",
  type: "info",
  title: "Hello Info",
  message: "This is info notification",
};
