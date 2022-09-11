import BaseDrawer from "@/components/Elements/BaseDrawer.vue";
import BaseButton from "@/components/Elements/BaseButton.vue";
import { useDisclosure } from "@/composables/useDisclosure";

export default {
  title: "Components/Elements/BaseDrawer",
  component: BaseDrawer,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
};

const Template = (args) => ({
  components: { BaseDrawer, BaseButton },
  setup() {
    const { close, open, isOpen } = useDisclosure();

    return { close, open, isOpen, args };
  },
  template: `
    <BaseButton @click="open">Open Drawer</BaseButton>
    <BaseDrawer
      @close="close"
      :isOpen="isOpen"
      title="Sample Drawer"
      size="md"
    >
      Hello
      <template #footer>
        <BaseButton variant="inverse" size="sm" @click="close">
          Cancel
        </BaseButton>
      </template>
    </BaseDrawer>
  `,
});

export const Demo = Template.bind({});
