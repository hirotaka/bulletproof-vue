import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toValue } from 'vue';

import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/vue-query';
import type { Discussion } from '@/types/api';

import type { CreateDiscussionInput } from '../types';

import { getDiscussionsQueryOptions } from './get-discussions';

export const createDiscussion = ({
  data,
}: {
  data: CreateDiscussionInput;
}): Promise<Discussion> => {
  return api.post(`/discussions`, data);
};

type UseCreateDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof createDiscussion>;
};

export const useCreateDiscussion = ({
  mutationConfig,
}: UseCreateDiscussionOptions = {}) => {
  const queryClient = useQueryClient();
  const config = toValue(mutationConfig);
  const onSuccessCallback = toValue(config?.onSuccess);

  return useMutation({
    ...mutationConfig,
    mutationFn: createDiscussion,
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
