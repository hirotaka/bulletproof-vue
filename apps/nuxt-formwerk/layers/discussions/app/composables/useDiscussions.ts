import type { PaginatedDiscussions } from "~discussions/shared/types";

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

  const { data, status, error, execute, refresh } = useFetch<PaginatedDiscussions>(
    () => `/api/discussions?${queryString.value}`,
    {
      default: () => ({
        data: [],
        meta: {
          page: 1,
          limit: 10,
          totalPages: 1,
          total: 0,
        },
      }),
      immediate: false,
      key: () => `discussions-${queryString.value}`,
    },
  );

  const isPending = computed(() => status.value === "pending");
  const isSuccess = computed(() => status.value === "success");

  return {
    data,
    isPending,
    isSuccess,
    error,
    fetch: execute,
    refresh,
  };
}
