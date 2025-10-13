<script setup lang="ts">
import { h } from 'vue';
import { useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';

import { Link } from '@/components/ui/link';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import { formatDate } from '@/utils/format';

import { getDiscussionQueryOptions } from '../api/get-discussion';
import { useDiscussions } from '../api/get-discussions';

import DeleteDiscussion from './delete-discussion.vue';

type DiscussionsListProps = {
  onDiscussionPrefetch?: (id: string) => void;
};

const props = defineProps<DiscussionsListProps>();

const route = useRoute();
const queryClient = useQueryClient();

const page = +(route.query.page || 1);
const discussionsQuery = useDiscussions({ page });

const handleDiscussionHover = (id: string) => {
  // Prefetch the discussion data when the user hovers over the link
  queryClient.prefetchQuery(getDiscussionQueryOptions(id));
  props.onDiscussionPrefetch?.(id);
};
</script>

<template>
  <div v-if="discussionsQuery.isLoading.value" class="flex h-48 w-full items-center justify-center">
    <Spinner size="lg" />
  </div>
  <Table
    v-else-if="discussionsQuery.data.value?.data"
    :data="discussionsQuery.data.value.data"
    :columns="[
      {
        title: 'Title',
        field: 'title',
      },
      {
        title: 'Created At',
        field: 'createdAt',
        Cell: ({ entry }) =>
          h('span', {}, formatDate(entry.createdAt)),
      },
      {
        title: '',
        field: 'id',
        Cell: ({ entry }) =>
          h(
            Link,
            {
              to: paths.app.discussions.detail.getHref(entry.id),
              onMouseenter: () => handleDiscussionHover(entry.id),
            },
            () => 'View',
          ),
      },
      {
        title: '',
        field: 'id',
        Cell: ({ entry }) => h(DeleteDiscussion, { id: entry.id }),
      },
    ]"
    :pagination="
      discussionsQuery.data.value?.meta
        ? {
            totalPages: discussionsQuery.data.value.meta.totalPages,
            currentPage: discussionsQuery.data.value.meta.page,
            rootUrl: '',
          }
        : undefined
    "
  />
</template>
