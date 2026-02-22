import type { PaginatedDiscussions } from "~discussions/shared/types";

export function useDiscussions(params: {
  page?: MaybeRefOrGetter<number>;
  limit?: MaybeRefOrGetter<number>;
} = {}) {
  const queryString = computed(() => {
    const page = toValue(params.page);
    const limit = toValue(params.limit);
    const query = new URLSearchParams();
    if (page) query.set("page", page.toString());
    if (limit) query.set("limit", limit.toString());
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
