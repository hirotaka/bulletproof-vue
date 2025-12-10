<script setup lang="ts">
import { ArchiveX } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { fetchComments } from '~comments/app/composables/useComments'
import type { Comment } from '~comments/shared/types'
import { formatDate } from '#layers/base/app/utils/format'
import { POLICIES } from '#layers/auth/app/composables/useAuthorization'

interface CommentsListProps {
  discussionId: string
}

const props = defineProps<CommentsListProps>()

const { user } = useUser()
const comments = ref<Comment[]>([])
const currentPage = ref(1)
const totalPages = ref(0)
const hasMore = ref(false)
const isLoading = ref(false)

const loadComments = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await fetchComments({
      discussionId: props.discussionId,
      page,
    })

    if (page === 1) {
      comments.value = response.data
    } else {
      comments.value = [...comments.value, ...response.data]
    }
    currentPage.value = response.meta.page
    totalPages.value = response.meta.totalPages
    hasMore.value = response.meta.hasMore || false
  } catch (error) {
    console.error('Failed to fetch comments', error)
  } finally {
    isLoading.value = false
  }
}

const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return
  await loadComments(currentPage.value + 1)
}

const handleCommentDeleted = async () => {
  // Reload comments from page 1
  await loadComments(1)
}

onMounted(async () => {
  await loadComments(1)
})

// Expose loadComments method so parent can trigger refresh
defineExpose({
  loadComments,
})
</script>

<template>
  <div v-if="isLoading && currentPage === 1" class="flex h-48 w-full items-center justify-center">
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
    <ul aria-label="comments" class="flex flex-col space-y-3">
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
              <span v-if="comment.author" class="text-xs font-bold">
                by {{ comment.author.firstName }} {{ comment.author.lastName }}
              </span>
            </div>
            <DeleteComment :comment-id="comment.id" @deleted="handleCommentDeleted" />
          </div>
        </Authorization>

        <UMDPreview :value="comment.body" />
      </li>
    </ul>

    <div v-if="hasMore" class="flex items-center justify-center py-4">
      <UButton @click="loadMore">
        <USpinner v-if="isLoading && currentPage > 1" />
        <template v-else>Load More Comments</template>
      </UButton>
    </div>
  </template>
</template>
