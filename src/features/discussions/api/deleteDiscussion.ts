import { useMutation, useQueryClient } from "vue-query";

import { axios } from "@/lib/axios";
import { useNotificationStore } from "@/stores/notifications";
import type { MutationConfig } from "@/lib/vue-query";

import type { Discussion } from "../types";

type DeleteDiscussionDTO = {
  discussionId: string;
};

export const deleteDiscussion = ({
  discussionId,
}: {
  discussionId: string;
}) => {
  return axios.delete(`/discussions/${discussionId}`);
};

type UseDeleteDiscussionOptions = {
  config?: MutationConfig<typeof deleteDiscussion>;
};

export const useDeleteDiscussion = ({
  config,
}: UseDeleteDiscussionOptions = {}) => {
  const queryClient = useQueryClient();
  const store = useNotificationStore();

  return useMutation<unknown, unknown, DeleteDiscussionDTO>({
    onMutate: async (deletedDiscussion: DeleteDiscussionDTO) => {
      await queryClient.cancelQueries(["discussions"]);

      const previousDiscussions = queryClient.getQueryData<Discussion[]>([
        "discussions",
      ]);

      queryClient.setQueryData(
        ["discussions"],
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussion.discussionId
        )
      );

      return { previousDiscussions };
    },
    onError: (_, __, context: any) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData(["discussions"], context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["discussions"]);
      store.add({
        type: "success",
        title: "Discussion Deleted",
      });
    },
    ...config,
    mutationFn: deleteDiscussion,
  });
};
