import { useMutation } from "#layers/base/app/composables/useMutation";

interface UseLogoutConfig {
  onSuccess?: () => void;
}

export const useLogout = (config?: UseLogoutConfig) => {
  const { clear } = useUserSession();

  return useMutation(
    async (): Promise<undefined> => {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });

      // Clear the local session
      await clear();

      return undefined;
    },
    {
      onSuccess: config?.onSuccess,
    },
  );
};
