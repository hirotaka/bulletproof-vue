import { useMutation } from "@pinia/colada";

interface UseLogoutConfig {
  onSuccess?: () => void;
}

export const useLogout = (config?: UseLogoutConfig) => {
  const { clear } = useUserSession();

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
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
