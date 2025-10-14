import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/vue-query'

import type { Comment, CreateCommentInput } from '../types'
import { getInfiniteCommentsQueryOptions } from './get-comments'

export const createComment = ({
  data,
}: {
  data: CreateCommentInput
}): Promise<Comment> => {
  return api.post('/comments', data)
}

type UseCreateCommentOptions = {
  discussionId: string
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({
  mutationConfig,
  discussionId,
}: UseCreateCommentOptions) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions(discussionId).queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: createComment,
  })
}
