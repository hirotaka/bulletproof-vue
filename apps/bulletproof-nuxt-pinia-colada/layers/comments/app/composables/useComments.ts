import type { PaginatedComments } from "~comments/shared/types";
import { useQuery } from "@pinia/colada";

/**
 * Query composable for fetching comments of a discussion.
 * Fetches page 1 by default. For "load more" pagination, use fetchMoreComments.
 */
export function useComments(discussionId: Ref<string> | string) {
  const id = computed(() => (typeof discussionId === "string" ? discussionId : discussionId.value));

  const { data, status, error, isPending, refresh, refetch } = useQuery({
    key: () => ["comments", id.value],
    query: () => $fetch<PaginatedComments>(`/api/comments?discussionId=${id.value}`),
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    data,
    isPending,
    isSuccess,
    error,
    refresh,
    refetch,
  };
}

/**
 * Fetch additional pages of comments (for "load more" pagination).
 */
export async function fetchMoreComments(params: {
  discussionId: string;
  page: number;
}): Promise<PaginatedComments> {
  const queryParams = new URLSearchParams();
  queryParams.set("discussionId", params.discussionId);
  queryParams.set("page", params.page.toString());

  return await $fetch<PaginatedComments>(
    `/api/comments?${queryParams.toString()}`,
    { method: "GET" },
  );
}
