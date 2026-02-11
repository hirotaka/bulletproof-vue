import type { DeleteUserResponse } from "~users/shared/types";
import { useMutation, useQueryCache } from "@pinia/colada";

interface UseDeleteUserConfig {
  onSuccess?: (message: string) => void;
}

export const useDeleteUser = (config?: UseDeleteUserConfig) => {
  const queryCache = useQueryCache();

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
  });

  return {
    mutate,
    isLoading,
    error,
  };
};
