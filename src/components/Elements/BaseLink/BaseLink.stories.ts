import vueRouter from "storybook-vue3-router";

import { BaseLink } from ".";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Elements/BaseLink",
  component: BaseLink,
  parameters: {
    controls: { expanded: true },
  },
} as Meta<typeof BaseLink>;

const Template: StoryFn<typeof BaseLink> = (args) => ({
  components: { BaseLink },
  setup() {
    return { args };
  },
  template: `
    <BaseLink to="/">
      Hello
    </BaseLink>
  `,
});

export const Default = Template.bind({});
Default.decorators = [vueRouter()];
