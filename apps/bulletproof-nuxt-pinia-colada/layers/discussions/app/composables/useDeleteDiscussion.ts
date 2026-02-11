import { useMutation, useQueryCache } from "@pinia/colada";

interface UseDeleteDiscussionConfig {
  onSuccess?: () => void;
}

export const useDeleteDiscussion = (config?: UseDeleteDiscussionConfig) => {
  const queryCache = useQueryCache();

  const { mutate, isLoading, error } = useMutation<undefined, string>({
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

  return {
    mutate,
    isLoading,
    error,
  };
};
