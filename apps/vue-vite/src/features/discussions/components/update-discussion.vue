<script setup lang="ts">
import { ref, computed } from 'vue';
import { Pen } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { Authorization } from '@/components/ui/authorization';
import { useNotificationStore } from '@/stores/notifications';

import { updateDiscussionInputSchema } from '../types';
import { useDiscussion } from '../api/get-discussion';
import { useUpdateDiscussion } from '../api/update-discussion';

type UpdateDiscussionProps = {
  discussionId: string;
};

const props = defineProps<UpdateDiscussionProps>();

const notificationStore = useNotificationStore();
const discussionQuery = useDiscussion({ discussionId: props.discussionId });
const updateDiscussionMutation = useUpdateDiscussion({
  mutationConfig: {
    onSuccess: () => {
      notificationStore.add({
        type: 'success',
        title: 'Discussion Updated',
      });
    },
  },
});

const isOpen = ref(false);

const initialValues = computed(() => ({
  title: discussionQuery.data.value?.data?.title ?? '',
  body: discussionQuery.data.value?.data?.body ?? '',
}));

const handleSubmit = (values: Record<string, unknown>) => {
  updateDiscussionMutation.mutate({
    data: values as { title: string; body: string },
    discussionId: props.discussionId,
  });
};
</script>

<template>
  <Authorization :allowed-roles="'ADMIN'">
    <FormDrawer
      v-model:open="isOpen"
      title="Update Discussion"
      submit-text="Submit"
      :is-loading="updateDiscussionMutation.isPending.value"
      :is-done="updateDiscussionMutation.isSuccess.value"
      @submit="() => {}"
    >
      <template #trigger>
        <Button size="sm">
          <Pen class="size-4 mr-2" />
          Update Discussion
        </Button>
      </template>

      <Form
        :schema="updateDiscussionInputSchema"
        :initial-values="initialValues"
        @submit="handleSubmit"
      >
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
