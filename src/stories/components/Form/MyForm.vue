<script setup lang="ts">
import {
  BaseForm,
  InputField,
  TextareaField,
  SelectField,
} from "@/components/Form";
import { BaseButton } from "@/components/Elements";

const options = ["A", "B", "C"].map((option) => ({
  label: option,
  value: option,
}));

const submit = async (values) => {
  alert(JSON.stringify(values, null, 2));
};

interface FormProps {
  hiddenSubmit?: boolean;
}

defineProps<FormProps>();
</script>

<template>
  <BaseForm id="my-form" @submit="submit">
    <InputField name="title" label="Title" type="text" />
    <TextareaField name="description" label="Description" />
    <SelectField name="team" label="Team" :options="options" />
    <div v-if="!hiddenSubmit">
      <BaseButton type="submit" class="w-full">Submit</BaseButton>
    </div>
  </BaseForm>
</template>
