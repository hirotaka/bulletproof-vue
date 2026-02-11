import type { PaginatedDiscussions } from "~discussions/shared/types";
import { useQuery } from "@pinia/colada";

export function useDiscussions(params: {
  page?: Ref<number>;
  limit?: Ref<number>;
} = {}) {
  const queryString = computed(() => {
    const query = new URLSearchParams();
    if (params.page?.value) query.set("page", params.page.value.toString());
    if (params.limit?.value) query.set("limit", params.limit.value.toString());
    return query.toString();
  });

  const { data, status, error, refresh, refetch, isPending } = useQuery({
    key: () => ["discussions", queryString.value],
    query: () => $fetch<PaginatedDiscussions>(`/api/discussions?${queryString.value}`),
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
