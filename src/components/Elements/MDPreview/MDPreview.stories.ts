import { MDPreview } from ".";

export default {
  title: "Components/Elements/MDPreview",
  component: MDPreview,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
};

const Template = (args) => ({
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
