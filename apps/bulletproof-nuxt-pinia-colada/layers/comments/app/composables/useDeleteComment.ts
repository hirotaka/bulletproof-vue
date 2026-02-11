import { useMutation, useQueryCache } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseDeleteCommentConfig {
  onSuccess?: () => void;
}

export const useDeleteComment = (config?: UseDeleteCommentConfig) => {
  const queryCache = useQueryCache();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error } = useMutation<undefined, string>({
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
    onError: (err) => {
      addNotification({
        type: "error",
        title: "Error",
        message: extractErrorMessage(err, "Operation failed"),
      });
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
};
