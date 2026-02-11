import type { CreateCommentInput } from "~comments/shared/schemas";
import type { Comment } from "~comments/shared/types";
import { useMutation, useQueryCache } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseCreateCommentConfig {
  onSuccess?: (comment: Comment) => void;
}

export const useCreateComment = (config?: UseCreateCommentConfig) => {
  const queryCache = useQueryCache();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error, status } = useMutation<Comment, CreateCommentInput>({
    mutation: async (input: CreateCommentInput) => {
      const response = await $fetch<{ data: Comment }>("/api/comments", {
        method: "POST",
        body: input,
      });

      return response.data;
    },
    onSuccess: (comment) => {
      queryCache.invalidateQueries({ key: ["comments"] });
      config?.onSuccess?.(comment);
    },
    onError: (err) => {
      addNotification({
        type: "error",
        title: "Error",
        message: extractErrorMessage(err, "Operation failed"),
      });
    },
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate,
    isLoading,
    isSuccess,
    error,
  };
};
