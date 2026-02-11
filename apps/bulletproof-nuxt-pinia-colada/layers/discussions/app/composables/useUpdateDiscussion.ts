import type { UpdateDiscussionInput } from "~discussions/shared/schemas";
import type { Discussion } from "~discussions/shared/types";
import { useMutation, useQueryCache } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UpdateDiscussionParams {
  id: string;
  data: UpdateDiscussionInput;
}

interface UseUpdateDiscussionConfig {
  onSuccess?: (discussion: Discussion) => void;
}

export const useUpdateDiscussion = (config?: UseUpdateDiscussionConfig) => {
  const queryCache = useQueryCache();
  const { addNotification } = useNotifications();

  const { mutate, isLoading, error, status } = useMutation<Discussion, UpdateDiscussionParams>({
    mutation: async ({ id, data }: UpdateDiscussionParams) => {
      const response = await $fetch<{ discussion: Discussion }>(
        `/api/discussions/${id}`,
        {
          method: "PATCH",
          body: data,
        },
      );

      return response.discussion;
    },
    onSuccess: (discussion) => {
      queryCache.invalidateQueries({ key: ["discussions"] });
      config?.onSuccess?.(discussion);
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
    mutate,
    isLoading,
    isSuccess,
    error,
  };
};
