import type { PaginatedComments } from "~comments/shared/types";
import { useInfiniteQuery } from "@pinia/colada";

export function useComments(discussionId: Ref<string> | string) {
  const id = computed(() => (typeof discussionId === "string" ? discussionId : discussionId.value));

  const {
    data,
    status,
    error,
    isPending,
    loadNextPage,
    hasNextPage,
    asyncStatus,
  } = useInfiniteQuery({
    key: () => ["comments", id.value],
    query: ({ pageParam }) =>
      $fetch<PaginatedComments>(
        `/api/comments?discussionId=${id.value}&page=${pageParam}`,
      ),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
  });

  const isSuccess = computed(() => status.value === "success");
  const isFetchingNextPage = computed(() => asyncStatus.value === "loading");
  const comments = computed(
    () => data.value?.pages.flatMap(page => page.data) ?? [],
  );

  return {
    data,
    comments,
    isPending,
    isSuccess,
    error,
    loadNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
