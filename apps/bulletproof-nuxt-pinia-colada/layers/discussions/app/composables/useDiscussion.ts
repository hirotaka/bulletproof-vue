import type { Discussion } from "~discussions/shared/types";
import { useQuery } from "@pinia/colada";

export function useDiscussion(id: Ref<string> | string) {
  const discussionId = computed(() => (typeof id === "string" ? id : id.value));

  const { data, error, isPending } = useQuery({
    key: () => ["discussions", discussionId.value],
    query: () => $fetch<{ discussion: Discussion }>(`/api/discussions/${discussionId.value}`),
  });

  return {
    data,
    isPending,
    error,
  };
}
