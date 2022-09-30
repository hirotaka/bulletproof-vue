<script setup lang="ts">
import { Form } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { PencilIcon } from "@heroicons/vue/solid";

import { BaseButton } from "@/components/Elements";
import { FormDrawer, InputField, TextareaField } from "@/components/Form";

import { useDiscussion } from "../api/getDiscussion";
import { useUpdateDiscussion } from "../api/updateDiscussion";
import type { UpdateDiscussionDTO } from "../api/updateDiscussion";

import { ROLES } from "@/composables/useAuthorization";
import { AuthorizationProvider } from "@/providers";

type UpdateDiscussionProps = {
  discussionId: string;
};

const validationSchema = toFormValidator(
  z.object({
    title: z.string().min(1, "Required"),
    body: z.string().min(1, "Required"),
  })
);

const props = defineProps<UpdateDiscussionProps>();

const { data: discussion } = useDiscussion({
  discussionId: props.discussionId,
});
const { isLoading, isSuccess, mutateAsync } = useUpdateDiscussion();

async function onSubmit(values: UpdateDiscussionDTO["data"]) {
  await mutateAsync({ data: values, discussionId: props.discussionId });
}
</script>

<template>
  <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
    <FormDrawer title="Update Discussion" :isDone="isSuccess">
      <template #triggerButton>
        <BaseButton size="sm">
          <template #startIcon>
            <PencilIcon class="h-4 w-4" />
          </template>
          Update Discussion
        </BaseButton>
      </template>
      <template #submitButton>
        <BaseButton
          type="submit"
          form="update-discussion"
          size="sm"
          :isLoading="isLoading"
        >
          Submit
        </BaseButton>
      </template>
      <Form
        id="update-discussion"
        class="space-y-6"
        @submit="onSubmit"
        :validation-schema="validationSchema"
      >
        <InputField
          name="title"
          label="Title"
          :value="discussion?.title"
          type="text"
        />
        <TextareaField name="body" label="Body" :value="discussion?.body" />
      </Form>
    </FormDrawer>
  </AuthorizationProvider>
</template>
