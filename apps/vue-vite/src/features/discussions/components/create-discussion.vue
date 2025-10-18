<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { Authorization } from '@/components/ui/authorization';
import { useNotificationStore } from '@/stores/notifications';

import { createDiscussionInputSchema } from '../types';
import { useCreateDiscussion } from '../api/create-discussion';

const notificationStore = useNotificationStore();
const createDiscussionMutation = useCreateDiscussion({
  mutationConfig: {
    onSuccess: () => {
      notificationStore.add({
        type: 'success',
        title: 'Discussion Created',
      });
    },
  },
});

const isOpen = ref(false);

const handleSubmit = (values: Record<string, unknown>) => {
  createDiscussionMutation.mutate({
    data: values as { title: string; body: string },
  });
};
</script>

<template>
  <Authorization :allowed-roles="'ADMIN'">
    <FormDrawer
      v-model:open="isOpen"
      title="Create Discussion"
      submit-text="Submit"
      :is-loading="createDiscussionMutation.isPending.value"
      :is-done="createDiscussionMutation.isSuccess.value"
      @submit="() => {}"
    >
      <template #trigger>
        <Button size="sm">
          <Plus class="size-4 mr-2" />
          Create Discussion
        </Button>
      </template>

      <Form :schema="createDiscussionInputSchema" @submit="handleSubmit">
        <template #default="{ isSubmitting }">
          <div class="space-y-4">
            <Input name="title" label="Title" :disabled="isSubmitting" />
            <Textarea name="body" label="Body" :disabled="isSubmitting" />
          </div>
        </template>
      </Form>
    </FormDrawer>
  </Authorization>
</template>
