<script setup lang="ts">
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { PlusIcon } from "@heroicons/vue/20/solid";

import { BaseButton } from "@/components/Elements";
import { BaseForm, FormDrawer, TextareaField } from "@/components/Form";

import { useCreateComment } from "../api/createComment";

type CreateCommentProps = {
  discussionId: string;
};

const validationSchema = toFormValidator(
  z.object({
    body: z.string().min(1, "Required"),
  })
);

const props = defineProps<CreateCommentProps>();

const { isLoading, isSuccess, mutateAsync } = useCreateComment({
  discussionId: props.discussionId,
});

async function onSubmit(values) {
  const data = {
    ...values,
    discussionId: props.discussionId,
  };
  await mutateAsync({ data });
}
</script>

<template>
  <FormDrawer title="Create Comment" :isDone="isSuccess">
    <template #triggerButton>
      <BaseButton size="sm">
        <template #startIcon>
          <PlusIcon class="h-4 w-4" />
        </template>
        Create Comment
      </BaseButton>
    </template>
    <template #submitButton>
      <BaseButton
        type="submit"
        form="create-comment"
        size="sm"
        :isLoading="isLoading"
      >
        Submit
      </BaseButton>
    </template>
    <BaseForm
      id="create-comment"
      @submit="onSubmit"
      :validation-schema="validationSchema"
    >
      <TextareaField name="body" label="Body" />
    </BaseForm>
  </FormDrawer>
</template>
