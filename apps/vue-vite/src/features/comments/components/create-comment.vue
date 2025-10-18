<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { FormDrawer, Form, Textarea } from '@/components/ui/form'
import { useNotificationStore } from '@/stores/notifications'

import { useCreateComment } from '../api/create-comment'
import { createCommentInputSchema } from '../types'

interface CreateCommentProps {
  discussionId: string
}

const props = defineProps<CreateCommentProps>()

const notificationStore = useNotificationStore()
const isOpen = ref(false)

const createCommentMutation = useCreateComment({
  discussionId: props.discussionId,
  mutationConfig: {
    onSuccess: () => {
      notificationStore.add({
        type: 'success',
        title: 'Comment Created',
      })
    },
  },
})

const handleSubmit = (values: Record<string, unknown>) => {
  createCommentMutation.mutate({
    data: values as { discussionId: string; body: string },
  })
}
</script>

<template>
  <FormDrawer
    v-model:open="isOpen"
    :is-done="createCommentMutation.isSuccess.value"
    title="Create Comment"
    :is-loading="createCommentMutation.isPending.value"
    @submit="() => {}"
  >
    <template #trigger>
      <Button size="sm" @click="isOpen = true">
        <Plus class="size-4 mr-1" />
        Create Comment
      </Button>
    </template>

    <Form
      :schema="createCommentInputSchema"
      :initial-values="{
        body: '',
        discussionId: props.discussionId,
      }"
      @submit="handleSubmit"
    >
      <template #default="{ errors }">
        <Textarea name="body" label="Body" :error="errors.body" />
      </template>
    </Form>
  </FormDrawer>
</template>
