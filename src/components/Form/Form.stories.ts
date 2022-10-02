import MyForm from "./MyForm.vue";
import FormDrawer from "@/components/Form/FormDrawer.vue";
import { BaseButton } from "@/components/Elements";

export default {
  title: "Components/Form",
  component: MyForm,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {},
};

const Template = () => ({
  components: { MyForm },
  setup() {
    return {};
  },
  template: '<MyForm />',
});

export const Default = Template.bind({});

const AsFormDrawerTemplate = () => ({
  components: { FormDrawer, MyForm, BaseButton },
  setup() {
    return {};
  },
  template: `
    <FormDrawer
      title="My Form"
      size="lg"
      :isDone="true"
    >
      <template #triggerButton>
        <BaseButton>
          Open
        </BaseButton>
      </template>
      <MyForm hiddenSubmit />
      <template #submitButton>
        <BaseButton form="my-form" type="submit">
          Submit
        </BaseButton>
      </template>
    </FormDrawer>
  `,
});

export const AsFormDrawer = AsFormDrawerTemplate.bind({});
