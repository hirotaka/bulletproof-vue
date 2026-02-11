import { useMutation, useQueryCache } from "@pinia/colada";

interface UseDeleteDiscussionConfig {
  onSuccess?: () => void;
}

export const useDeleteDiscussion = (config?: UseDeleteDiscussionConfig) => {
  const queryCache = useQueryCache();

  const { mutateAsync, isLoading, error, status } = useMutation<undefined, string>({
    mutation: async (id: string): Promise<undefined> => {
      await $fetch<{ success: boolean }>(`/api/discussions/${id}`, {
        method: "DELETE",
      });
      return undefined;
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["discussions"] });
      config?.onSuccess?.();
    },
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
