import { useMutation } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseLogoutConfig {
  onSuccess?: () => void;
}

export const useLogout = (config?: UseLogoutConfig) => {
  const { clear } = useUserSession();
  const { addNotification } = useNotifications();

  const { mutateAsync, isLoading, error, status } = useMutation({
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

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
