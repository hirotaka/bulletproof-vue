import type { UsersResponse } from "~users/shared/types";
import { useQuery } from "@pinia/colada";

export function useUsers() {
  const { data, status, error, refresh, refetch, isPending } = useQuery({
    key: () => ["users"],
    query: () => $fetch<UsersResponse>("/api/users"),
  });

  const isSuccess = computed(() => status.value === "success");

  return {
    data,
    isPending,
    isSuccess,
    error,
    refresh,
    refetch,
  };
}
