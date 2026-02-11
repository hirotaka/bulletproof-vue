import type { Discussion } from "~discussions/shared/types";
import { useQuery } from "@pinia/colada";

export function useDiscussion(id: Ref<string> | string) {
  const discussionId = computed(() => (typeof id === "string" ? id : id.value));

  const { data, status, error, refresh, refetch, isPending } = useQuery({
    key: () => ["discussions", discussionId.value],
    query: () => $fetch<{ discussion: Discussion }>(`/api/discussions/${discussionId.value}`),
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
