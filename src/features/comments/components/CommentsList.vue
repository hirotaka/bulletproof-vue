<script setup lang="ts">
import { ArchiveBoxIcon } from "@heroicons/vue/24/outline";

import { MDPreview, BaseSpinner } from "@/components/Elements";

import { useComments } from "../api/getComments";
import DeleteComment from "./DeleteComment.vue";

import { useAuth } from "@/composables/useAuth";
import { POLICIES } from "@/composables/useAuthorization";
import { AuthorizationProvider } from "@/providers";

import { formatDate } from "@/utils/format";

import type { User } from "@/features/users";

type CommentsListProps = {
  discussionId: string;
};

const props = defineProps<CommentsListProps>();

const { user } = useAuth();
const { data, isLoading } = useComments({ discussionId: props.discussionId });
</script>

<template>
  <div v-if="isLoading" class="w-full h-48 flex justify-center items-center">
    <BaseSpinner size="lg" />
  </div>
  <template v-if="data">
    <div
      v-if="!data.length"
      role="list"
      aria-label="comments"
      class="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
    >
      <ArchiveBoxIcon class="h-10 w-10" />
      <h4>No Comments Found</h4>
    </div>
    <ul v-else aria-label="comments" class="flex flex-col space-y-3">
      <li
        v-for="(comment, index) in data"
        class="w-full bg-white shadow-sm p-4"
        :key="comment.id"
        :aria-label="`comment-${comment.body}-${index}`"
      >
        <div class="flex justify-between">
          <span class="text-xs font-semibold">{{
            formatDate(comment.createdAt)
          }}</span>
          <AuthorizationProvider
            :policyCheck="POLICIES['comment:delete'](user as User, comment)"
          >
            <DeleteComment
              v-if="comment.id"
              :id="comment.id"
              :discussionId="discussionId"
            />
          </AuthorizationProvider>
        </div>
        <MDPreview :value="comment.body" />
      </li>
    </ul>
  </template>
</template>
