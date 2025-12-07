import type { UsersResponse } from "~users/shared/types";

export function useUsers() {
  const { data, status, error, refresh } = useFetch<UsersResponse>(
    "/api/users",
    {
      default: () => ({
        data: [],
      }),
      key: "users",
    },
  );

  const isLoading = computed(() => status.value === "pending");
  const isSuccess = computed(() => status.value === "success");

  return {
    data,
    isLoading,
    isSuccess,
    error,
    refresh,
  };
}
