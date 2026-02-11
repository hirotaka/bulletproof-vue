import type { UsersResponse } from "~users/shared/types";
import { useQuery } from "@pinia/colada";

export function useUsers() {
  const { data, error, isPending } = useQuery({
    key: () => ["users"],
    query: () => $fetch<UsersResponse>("/api/users"),
  });

  return {
    data,
    isPending,
    error,
  };
}
