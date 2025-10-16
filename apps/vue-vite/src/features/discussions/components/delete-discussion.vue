<script setup lang="ts">
import { ref } from 'vue';
import { Trash } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog/confirmation-dialog';
import { Authorization } from '@/components/ui/authorization';
import { useNotificationStore } from '@/stores/notifications';

import { useDeleteDiscussion } from '../api/delete-discussion';

type DeleteDiscussionProps = {
  id: string;
};

const props = defineProps<DeleteDiscussionProps>();

const notificationStore = useNotificationStore();
const deleteDiscussionMutation = useDeleteDiscussion({
  mutationConfig: {
    onSuccess: () => {
      notificationStore.add({
        type: 'success',
        title: 'Discussion Deleted',
      });
      isOpen.value = false;
    },
  },
});

const isOpen = ref(false);

const handleConfirm = () => {
  deleteDiscussionMutation.mutate({ discussionId: props.id });
};
</script>

<template>
  <Authorization :allowed-roles="'ADMIN'">
    <Button variant="destructive" size="sm" @click="isOpen = true">
      <Trash class="size-4" />
    </Button>
    <ConfirmationDialog
      :open="isOpen"
      title="Delete Discussion"
      body="Are you sure you want to delete this discussion?"
      confirm-text="Delete Discussion"
      :is-loading="deleteDiscussionMutation.isPending.value"
      @confirm="handleConfirm"
      @cancel="isOpen = false"
    />
  </Authorization>
</template>
