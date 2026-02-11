import type { DeleteUserResponse } from "~users/shared/types";
import { useMutation, useQueryCache } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseDeleteUserConfig {
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
}

export const useDeleteUser = (config?: UseDeleteUserConfig) => {
  const queryCache = useQueryCache();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error } = useMutation<string, string>({
    mutation: async (userId: string) => {
      const response = await $fetch<DeleteUserResponse>(
        `/api/users/${userId}`,
        {
          method: "DELETE",
        },
      );

      return response.message;
    },
    onSuccess: (message) => {
      queryCache.invalidateQueries({ key: ["users"] });
      config?.onSuccess?.(message);
    },
    onError: (err) => {
      addNotification({
        type: "error",
        title: "Error",
        message: extractErrorMessage(err, "Operation failed"),
      });
      config?.onError?.(err as Error);
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
};
