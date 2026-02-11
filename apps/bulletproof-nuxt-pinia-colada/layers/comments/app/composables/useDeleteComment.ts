import { useMutation, useQueryCache } from "@pinia/colada";

interface UseDeleteCommentConfig {
  onSuccess?: () => void;
}

export const useDeleteComment = (config?: UseDeleteCommentConfig) => {
  const queryCache = useQueryCache();

  const { mutateAsync, isLoading, error, status } = useMutation<undefined, string>({
    mutation: async (commentId: string): Promise<undefined> => {
      await $fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
      return undefined;
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["comments"] });
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
