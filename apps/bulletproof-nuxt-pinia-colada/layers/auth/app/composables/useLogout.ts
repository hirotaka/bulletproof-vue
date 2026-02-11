import { useMutation } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseLogoutConfig {
  onSuccess?: () => void;
}

export const useLogout = (config?: UseLogoutConfig) => {
  const { clear } = useUserSession();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error } = useMutation({
    mutation: async (): Promise<undefined> => {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });

      // Clear the local session
      await clear();

      return undefined;
    },
    onSuccess: () => {
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
