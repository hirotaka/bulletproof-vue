import type { RegisterInput } from "~auth/shared/schemas";
import type { User } from "~auth/shared/types";
import { useMutation } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseRegisterConfig {
  onSuccess?: (user: User) => void;
}

export const useRegister = (config?: UseRegisterConfig) => {
  const { fetch } = useUserSession();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error } = useMutation<User, RegisterInput>({
    mutation: async (input: RegisterInput) => {
      const response = await $fetch<{ user: User }>("/api/auth/register", {
        method: "POST",
        body: input,
      });

      // Refresh the session from the server
      await fetch();

      return response.user;
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
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
};
