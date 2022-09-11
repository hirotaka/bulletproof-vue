<script setup lang="ts">
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { PlusIcon } from "@heroicons/vue/outline";

import { BaseButton } from "@/components/Elements";
import {
  BaseForm,
  FormDrawer,
  InputField,
  TextareaField,
} from "@/components/Form";

import { useCreateDiscussion } from "../api/createDiscussion";
import { ROLES } from "@/composables/useAuthorization";
import { AuthorizationProvider } from "@/providers";

const validationSchema = toFormValidator(
  z.object({
    title: z.string().min(1, "Required"),
    body: z.string().min(1, "Required"),
  })
);

const { isLoading, isSuccess, mutateAsync } = useCreateDiscussion();

async function onSubmit(values) {
  await mutateAsync({ data: values });
}
</script>

<template>
  <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
    <FormDrawer title="Create Discussion" :isDone="isSuccess">
      <template #triggerButton>
        <BaseButton size="sm">
          <template #startIcon>
            <PlusIcon class="h-4 w-4" />
          </template>
          Create Discussion
        </BaseButton>
      </template>
      <template #submitButton>
        <BaseButton
          type="submit"
          form="create-discussion"
          size="sm"
          :isLoading="isLoading"
        >
          Submit
        </BaseButton>
      </template>
      <BaseForm
        id="create-discussion"
        @submit="onSubmit"
        :validation-schema="validationSchema"
      >
        <InputField name="title" label="Title" type="text" />
        <TextareaField name="body" label="Body" />
      </BaseForm>
    </FormDrawer>
  </AuthorizationProvider>
</template>
