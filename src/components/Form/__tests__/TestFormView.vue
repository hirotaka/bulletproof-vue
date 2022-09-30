<script setup lang="ts">
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm } from "../";
import { InputField } from "../";

const validationSchema = toFormValidator(
  z.object({
    title: z.string().min(1, "Required"),
  })
);

type TestFormProps = {
  handleSubmit: () => void;
};

defineProps<TestFormProps>();
</script>

<template>
  <BaseForm
    @submit="handleSubmit"
    :validation-schema="validationSchema"
    id="my-form"
  >
    <InputField label="Title" name="title" type="text" />
    <BaseButton name="submit" type="submit" class="w-full">Submit</BaseButton>
  </BaseForm>
</template>
