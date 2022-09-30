<script setup lang="ts">
import { useRoute } from "vue-router";

import { formatDate } from "@/utils/format";

import { ContentLayout } from "@/components/Layout";
import { BaseSpinner, MDPreview } from "@/components/Elements";

import Comments from "@/features/comments/components/CommentsView.vue";

import UpdateDiscussion from "../components/UpdateDiscussion.vue";
import { useDiscussion } from "../api/getDiscussion";

const {
  params: { id },
} = useRoute();

const { data, isLoading } = useDiscussion({ discussionId: id as string });
</script>

<template>
  <div
    v-if="isLoading"
    className="w-full h-48 flex justify-center items-center"
  >
    <BaseSpinner size="lg" />
  </div>
  <ContentLayout v-if="data" :title="data.title">
    <span class="text-xs font-bold">
      {{ formatDate(data.createdAt) }}
    </span>
    <div class="mt-6 flex flex-col space-y-16">
      <div class="flex justify-end">
        <UpdateDiscussion :discussionId="data.id" />
      </div>
      <div>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <div class="mt-1 max-w-2xl text-sm text-gray-500">
              <MDPreview :value="data.body" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Comments :discussionId="data.id" />
      </div>
    </div>
  </ContentLayout>
</template>
