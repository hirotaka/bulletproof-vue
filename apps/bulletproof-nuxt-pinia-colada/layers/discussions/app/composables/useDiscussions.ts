import type { PaginatedDiscussions } from "~discussions/shared/types";
import { useQuery } from "@pinia/colada";

export function useDiscussions(params: {
  page?: Ref<number>;
  limit?: Ref<number>;
} = {}) {
  const { $api } = useNuxtApp();
  const queryString = computed(() => {
    const query = new URLSearchParams();
    if (params.page?.value) query.set("page", params.page.value.toString());
    if (params.limit?.value) query.set("limit", params.limit.value.toString());
    return query.toString();
  });

  const { data, error, isPending } = useQuery({
    key: () => ["discussions", queryString.value],
    query: () => $api<PaginatedDiscussions>(`/api/discussions?${queryString.value}`),
  });

  return {
    data,
    isPending,
    error,
  };
}
