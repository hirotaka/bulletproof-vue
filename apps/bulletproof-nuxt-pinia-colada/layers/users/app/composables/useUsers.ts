import type { UsersResponse } from "~users/shared/types";
import { useQuery } from "@pinia/colada";

export function useUsers() {
  const { $api } = useNuxtApp();

  const { data, error, isPending } = useQuery({
    key: () => ["users"],
    query: () => $api<UsersResponse>("/api/users"),
  });

  return {
    data,
    isPending,
    error,
  };
}
