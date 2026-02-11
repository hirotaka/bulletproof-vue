<script setup lang="ts">
import { ArchiveX } from "lucide-vue-next";
import { ref, computed, watch } from "vue";
import { useComments, fetchMoreComments } from "~comments/app/composables/useComments";
import type { Comment } from "~comments/shared/types";
import { formatDate } from "#layers/base/app/utils/format";
import { POLICIES } from "#layers/auth/app/composables/useAuthorization";

interface CommentsListProps {
  discussionId: string;
}

const props = defineProps<CommentsListProps>();

const { user } = useUser();
const commentsQuery = useComments(props.discussionId);

const additionalComments = ref<Comment[]>([]);
const currentPage = ref(1);
const hasMore = ref(false);
const isLoadingMore = ref(false);

const comments = computed(() => {
  const base = commentsQuery.data.value?.data ?? [];
  if (currentPage.value === 1) return base;
  return [...base, ...additionalComments.value];
});

// Reset pagination when query data refreshes (e.g. after cache invalidation)
watch(() => commentsQuery.data.value, (newData) => {
  if (newData) {
    currentPage.value = 1;
    additionalComments.value = [];
    hasMore.value = newData.meta.hasMore || false;
  }
});

const loadMore = async () => {
  if (!hasMore.value || isLoadingMore.value) return;
  isLoadingMore.value = true;
  try {
    const nextPage = currentPage.value + 1;
    const response = await fetchMoreComments({
      discussionId: props.discussionId,
      page: nextPage,
    });
    additionalComments.value = [...additionalComments.value, ...response.data];
    currentPage.value = nextPage;
    hasMore.value = response.meta.hasMore || false;
  }
  finally {
    isLoadingMore.value = false;
  }
};
</script>

<template>
  <div
    v-if="commentsQuery.isPending.value"
    class="flex h-48 w-full items-center justify-center"
  >
    <USpinner size="lg" />
  </div>

  <div
    v-else-if="!comments.length"
    role="list"
    aria-label="comments"
    class="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
  >
    <ArchiveX class="size-10" />
    <h4>No Comments Found</h4>
  </div>

  <template v-else>
    <ul
      aria-label="comments"
      class="flex flex-col space-y-3"
    >
      <li
        v-for="(comment, index) in comments"
        :key="comment.id || index"
        :aria-label="`comment-${comment.body}-${index}`"
        class="w-full bg-white p-4 shadow-sm"
      >
        <Authorization :policy-check="user ? POLICIES['comment:delete'](user, comment) : false">
          <div class="flex justify-between">
            <div>
              <span class="text-xs font-semibold">
                {{ formatDate(comment.createdAt) }}
              </span>
              <span
                v-if="comment.author"
                class="text-xs font-bold"
              >
                by {{ comment.author.firstName }} {{ comment.author.lastName }}
              </span>
            </div>
            <DeleteComment :comment-id="comment.id" />
          </div>
        </Authorization>

        <UMDPreview :value="comment.body" />
      </li>
    </ul>

    <div
      v-if="hasMore"
      class="flex items-center justify-center py-4"
    >
      <UButton @click="loadMore">
        <USpinner v-if="isLoadingMore" />
        <template v-else>
          Load More Comments
        </template>
      </UButton>
    </div>
  </template>
</template>
