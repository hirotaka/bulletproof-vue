import type { Meta, StoryFn } from "@storybook/vue3";
import { BaseSpinner, variants, sizes } from ".";

export default {
  title: "Components/Elements/BaseSpinner",
  component: BaseSpinner,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: Object.keys(variants),
    },
    size: {
      control: { type: "radio" },
      options: Object.keys(sizes),
    },
  },
} as Meta<typeof BaseSpinner>;

const Template: StoryFn<typeof BaseSpinner> = (args) => ({
  components: { BaseSpinner },
  setup() {
    return { args };
  },
  template: '<BaseSpinner v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
