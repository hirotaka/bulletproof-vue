import { useMutation, useQueryCache } from "@pinia/colada";

interface UseDeleteCommentConfig {
  onSuccess?: () => void;
}

export const useDeleteComment = (config?: UseDeleteCommentConfig) => {
  const { $api } = useNuxtApp();
  const queryCache = useQueryCache();

  const { mutate, isLoading, error } = useMutation<void, string>({
    mutation: async (commentId: string): Promise<void> => {
      await $api(`/api/comments/${commentId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["comments"] });
      config?.onSuccess?.();
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
};
