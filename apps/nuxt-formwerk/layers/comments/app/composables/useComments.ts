import type { PaginatedComments } from "~comments/shared/types";

/**
 * Fetch comments for a discussion with pagination support
 * Simple fetch function - state management is handled by the component
 */
export async function fetchComments(params: {
  discussionId: string;
  page?: number;
}): Promise<PaginatedComments> {
  const queryParams = new URLSearchParams();
  queryParams.set("discussionId", params.discussionId);
  if (params.page) queryParams.set("page", params.page.toString());

  return await $fetch<PaginatedComments>(
    `/api/comments?${queryParams.toString()}`,
    {
      method: "GET",
    },
  );
}
