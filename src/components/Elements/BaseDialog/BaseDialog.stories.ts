import { ref } from "vue";
import { BaseDialog, BaseDialogTitle } from ".";
import { BaseButton } from "../BaseButton";

import { useDisclosure } from "@/composables/useDisclosure";

export default {
  title: "Components/Elements/BaseDialog",
  component: BaseDialog,
  parameters: {
    controls: { expanded: true },
  },
};

const Template = (args) => ({
  components: { BaseDialog, BaseDialogTitle, BaseButton },
  setup() {
    const { open, close, isOpen } = useDisclosure();
    const cancelButtonRef = ref<InstanceType<typeof BaseButton>>(null);

    return { open, close, isOpen, cancelButtonRef, args };
  },
  template: `
    <BaseButton @click="open">
      Open Modal
    </BaseButton>
    <BaseDialog
      @close="close"
      :isOpen="isOpen"
      :initialFocus="cancelButtonRef"
    >
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <BaseDialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
            Modal Title
          </BaseDialogTitle>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <BaseButton
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-400 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            @click="close"
            ref="cancelButtonRef"
          >
            Cancel
          </BaseButton>
        </div>
      </div>
    </BaseDialog>
  `,
});

export const Default = Template.bind({});
