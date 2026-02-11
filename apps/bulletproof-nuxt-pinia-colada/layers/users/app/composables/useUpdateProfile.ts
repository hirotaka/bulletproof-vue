import type { User } from "#layers/auth/shared/types";
import type { UpdateProfileInput } from "~users/shared/schemas";
import type { UserResponse } from "~users/shared/types";
import { useMutation } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseUpdateProfileConfig {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export const useUpdateProfile = (config?: UseUpdateProfileConfig) => {
  const { addNotification } = useNotifications();

  const { mutateAsync, isLoading, error, status } = useMutation<User, UpdateProfileInput>({
    mutation: async (input: UpdateProfileInput) => {
      const response = await $fetch<UserResponse>("/api/profile", {
        method: "PATCH",
        body: input,
      });

      return response.data;
    },
    onSuccess: (user) => {
      config?.onSuccess?.(user);
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

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
