import type { User } from "#layers/auth/shared/types";
import type { UpdateProfileInput } from "~users/shared/schemas";
import type { UserResponse } from "~users/shared/types";
import { useMutation } from "@pinia/colada";

interface UseUpdateProfileConfig {
  onSuccess?: (user: User) => void;
}

export const useUpdateProfile = (config?: UseUpdateProfileConfig) => {
  const { mutate, isLoading, error, status } = useMutation<User, UpdateProfileInput>({
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
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    mutate,
    isLoading,
    isSuccess,
    error,
  };
};
