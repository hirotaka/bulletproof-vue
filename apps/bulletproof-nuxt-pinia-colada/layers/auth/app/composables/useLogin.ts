import type { LoginInput } from "~auth/shared/schemas";
import type { User } from "~auth/shared/types";
import { useMutation } from "@pinia/colada";

interface UseLoginConfig {
  onSuccess?: (user: User) => void;
}

export const useLogin = (config?: UseLoginConfig) => {
  const { fetch } = useUserSession();

  const { mutateAsync, isLoading, error, status } = useMutation<User, LoginInput>({
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
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
