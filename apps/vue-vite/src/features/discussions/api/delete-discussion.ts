import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toValue } from 'vue';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/vue-query';

import { getDiscussionsQueryOptions } from './get-discussions';

export const deleteDiscussion = ({
  discussionId,
}: {
  discussionId: string;
}) => {
  return api.delete(`/discussions/${discussionId}`);
};

type UseDeleteDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof deleteDiscussion>;
};

export const useDeleteDiscussion = ({
  mutationConfig,
}: UseDeleteDiscussionOptions = {}) => {
  const queryClient = useQueryClient();
  const config = toValue(mutationConfig);
  const onSuccessCallback = toValue(config?.onSuccess);

  return useMutation({
    ...mutationConfig,
    mutationFn: deleteDiscussion,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDiscussionsQueryOptions().queryKey,
      });
      if (onSuccessCallback && typeof onSuccessCallback === 'function') {
        onSuccessCallback(...args);
      }
    },
  });
};
