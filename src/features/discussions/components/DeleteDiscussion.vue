<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/outline";

import { BaseButton, ConfirmationDialog } from "@/components/Elements";

import { useDeleteDiscussion } from "../api/deleteDiscussion";

import { ROLES } from "@/composables/useAuthorization";
import { AuthorizationProvider } from "@/providers";

type DeleteDiscussionProps = {
  id: string;
};

const props = defineProps<DeleteDiscussionProps>();

const { isLoading, isSuccess, mutateAsync } = useDeleteDiscussion();

async function onClick() {
  await mutateAsync({ discussionId: props.id });
}
</script>

<template>
  <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
    <ConfirmationDialog
      :isDone="isSuccess"
      icon="danger"
      title="Delete Disucussion"
      body="Are you sure you want to delete this discussion?"
    >
      <template #triggerButton>
        <BaseButton variant="danger">
          <template #startIcon>
            <TrashIcon class="h-4 w-4" />
          </template>
          Delete Discussion
        </BaseButton>
      </template>
      <template #confirmButton>
        <BaseButton
          @click="onClick"
          :isLoading="isLoading"
          type="button"
          class="bg-red-600"
        >
          Delete Discussion
        </BaseButton>
      </template>
    </ConfirmationDialog>
  </AuthorizationProvider>
</template>
