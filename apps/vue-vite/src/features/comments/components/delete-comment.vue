<script setup lang="ts">
import { ref } from 'vue'
import { Trash } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog'
import { useNotificationStore } from '@/stores/notifications'

import { useDeleteComment } from '../api/delete-comment'

interface DeleteCommentProps {
  id: string
  discussionId: string
}

const props = defineProps<DeleteCommentProps>()

const notificationStore = useNotificationStore()
const isOpen = ref(false)

const deleteCommentMutation = useDeleteComment({
  discussionId: props.discussionId,
  mutationConfig: {
    onSuccess: () => {
      notificationStore.add({
        type: 'success',
        title: 'Comment Deleted',
      })
      isOpen.value = false
    },
  },
})

const handleConfirm = () => {
  deleteCommentMutation.mutate({ commentId: props.id })
}
</script>

<template>
  <div>
    <Button variant="destructive" size="sm" @click="isOpen = true">
      <Trash class="size-4 mr-1" />
      Delete Comment
    </Button>

    <ConfirmationDialog
      :open="isOpen"
      :is-done="deleteCommentMutation.isSuccess.value"
      :is-loading="deleteCommentMutation.isPending.value"
      title="Delete Comment"
      body="Are you sure you want to delete this comment?"
      confirm-text="Delete Comment"
      @confirm="handleConfirm"
      @cancel="isOpen = false"
    />
  </div>
</template>
