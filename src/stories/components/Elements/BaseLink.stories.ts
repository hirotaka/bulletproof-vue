import vueRouter from "storybook-vue3-router";

import BaseLink from "@/components/Elements/BaseLink.vue";

export default {
  title: "Components/Elements/BaseLink",
  component: BaseLink,
  parameters: {
    controls: { expanded: true },
  },
};

const Template = (args) => ({
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
Default.args = {};
Default.decorators = [vueRouter()];
