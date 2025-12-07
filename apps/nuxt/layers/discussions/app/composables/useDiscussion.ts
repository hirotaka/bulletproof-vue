import type { Discussion } from "~discussions/shared/types";

export function useDiscussion(id: Ref<string> | string) {
  const discussionId = computed(() => (typeof id === "string" ? id : id.value));

  const { data, status, error, execute, refresh } = useFetch<{
    discussion: Discussion;
  }>(() => `/api/discussions/${discussionId.value}`, {
    default: () => ({
      discussion: {
        id: "",
        title: "",
        body: "",
        authorId: "",
        teamId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          id: "",
          firstName: "",
          lastName: "",
        },
      },
    }),
    immediate: false,
    key: () => `discussion-${discussionId.value}`,
  });

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
