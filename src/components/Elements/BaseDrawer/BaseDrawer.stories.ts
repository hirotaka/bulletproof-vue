import { BaseDrawer } from ".";
import { BaseButton } from "@/components/Elements";
import { useDisclosure } from "@/composables/useDisclosure";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/Elements/BaseDrawer",
  component: BaseDrawer,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
} as Meta<typeof BaseDrawer>;

const Template: StoryFn<typeof BaseDrawer> = (args) => ({
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
