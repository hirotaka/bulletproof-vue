import { useMutation, useQueryCache } from "@pinia/colada";
import { useNotifications } from "#layers/base/app/composables/useNotifications";
import { extractErrorMessage } from "~base/app/utils/errors";

interface UseDeleteDiscussionConfig {
  onSuccess?: () => void;
}

export const useDeleteDiscussion = (config?: UseDeleteDiscussionConfig) => {
  const queryCache = useQueryCache();
  const { addNotification } = useNotifications();

  const { mutateAsync, isLoading, error, status } = useMutation<undefined, string>({
    mutation: async (id: string): Promise<undefined> => {
      await $fetch<{ success: boolean }>(`/api/discussions/${id}`, {
        method: "DELETE",
      });
      return undefined;
    },
    onSuccess: () => {
      queryCache.invalidateQueries({ key: ["discussions"] });
      config?.onSuccess?.();
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
    mutate: mutateAsync,
    isPending: isLoading,
    isSuccess,
    error,
  };
};
