import type { CreateCommentInput } from "~comments/shared/schemas";
import type { Comment } from "~comments/shared/types";
import { useMutation, useQueryCache } from "@pinia/colada";

interface UseCreateCommentConfig {
  onSuccess?: (comment: Comment) => void;
}

export const useCreateComment = (config?: UseCreateCommentConfig) => {
  const queryCache = useQueryCache();

  const { mutateAsync, isLoading, error, status } = useMutation<Comment, CreateCommentInput>({
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
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
