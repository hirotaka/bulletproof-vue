import type { RegisterInput } from "~auth/shared/schemas";
import type { User } from "~auth/shared/types";
import { useMutation } from "@pinia/colada";

interface UseRegisterConfig {
  onSuccess?: (user: User) => void;
}

export const useRegister = (config?: UseRegisterConfig) => {
  const { fetch } = useUserSession();

  const { mutateAsync, isLoading, error, status } = useMutation<User, RegisterInput>({
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
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
