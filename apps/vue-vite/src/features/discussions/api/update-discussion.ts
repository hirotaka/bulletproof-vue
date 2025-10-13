import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toValue } from 'vue';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/vue-query';
import type { Discussion } from '@/types/api';

import type { UpdateDiscussionInput } from '../types';

import { getDiscussionQueryOptions } from './get-discussion';

export const updateDiscussion = ({
  data,
  discussionId,
}: {
  data: UpdateDiscussionInput;
  discussionId: string;
}): Promise<Discussion> => {
  return api.patch(`/discussions/${discussionId}`, data);
};

type UseUpdateDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof updateDiscussion>;
};

export const useUpdateDiscussion = ({
  mutationConfig,
}: UseUpdateDiscussionOptions = {}) => {
  const queryClient = useQueryClient();
  const config = toValue(mutationConfig);
  const onSuccessCallback = toValue(config?.onSuccess);

  return useMutation({
    ...mutationConfig,
    mutationFn: updateDiscussion,
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getDiscussionQueryOptions(data.id).queryKey,
      });
      if (onSuccessCallback && typeof onSuccessCallback === 'function') {
        onSuccessCallback(data, ...args);
      }
    },
  });
};
