import type { LoginInput } from "~auth/shared/schemas";
import type { User } from "~auth/shared/types";
import { useMutation } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseLoginConfig {
  onSuccess?: (user: User) => void;
}

export const useLogin = (config?: UseLoginConfig) => {
  const { fetch } = useUserSession();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error } = useMutation<User, LoginInput>({
    mutation: async (input: LoginInput) => {
      const response = await $fetch<{ user: User }>("/api/auth/login", {
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
