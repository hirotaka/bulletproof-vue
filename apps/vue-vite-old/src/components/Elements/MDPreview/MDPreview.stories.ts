import { MDPreview } from ".";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Elements/MDPreview",
  component: MDPreview,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
} as Meta<typeof MDPreview>;

const Template: StoryFn<typeof MDPreview> = (args) => ({
  components: { MDPreview },
  setup() {
    return { args };
  },
  template: '<MDPreview v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: `## Hello World`,
};
