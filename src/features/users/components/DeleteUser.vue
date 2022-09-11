<script setup lang="ts">
import { BaseButton, ConfirmationDialog } from "@/components/Elements";

import { useAuth } from "@/composables/useAuth";
import { useDeleteUser } from "../api/deleteUser";

type DeleteUserProps = {
  id: string;
};

const props = defineProps<DeleteUserProps>();

const { user } = useAuth();
const { isLoading, isSuccess, mutateAsync } = useDeleteUser();

async function onClick() {
  await mutateAsync({ userId: props.id });
}
</script>

<template>
  <ConfirmationDialog
    v-if="user?.id !== id"
    :isDone="isSuccess"
    icon="danger"
    title="Delete User"
    body="Are you sure you want to delete this user?"
  >
    <template #triggerButton>
      <BaseButton variant="danger">Delete</BaseButton>
    </template>
    <template #confirmButton>
      <BaseButton
        @click="onClick"
        :isLoading="isLoading"
        type="button"
        class="bg-red-600"
      >
        Delete User
      </BaseButton>
    </template>
  </ConfirmationDialog>
</template>
