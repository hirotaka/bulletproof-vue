import BaseSpinner, {
  variants,
  sizes,
} from "@/components/Elements/BaseSpinner.vue";

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
};

const Template = (args) => ({
  components: { BaseSpinner },
  setup() {
    return { args };
  },
  template: '<BaseSpinner v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
