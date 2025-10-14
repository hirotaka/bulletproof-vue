import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toValue } from 'vue'

import { api } from '@/lib/api-client'
import type { MutationConfig } from '@/lib/vue-query'

import { getInfiniteCommentsQueryOptions } from './get-comments'

export const deleteComment = ({ commentId }: { commentId: string }) => {
  return api.delete(`/comments/${commentId}`)
}

type UseDeleteCommentOptions = {
  discussionId: string
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({
  mutationConfig,
  discussionId,
}: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient()
  const config = toValue(mutationConfig)
  const onSuccessCallback = toValue(config?.onSuccess)

  return useMutation({
    ...mutationConfig,
    mutationFn: deleteComment,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions(discussionId).queryKey,
      })
      if (onSuccessCallback && typeof onSuccessCallback === 'function') {
        onSuccessCallback(...args)
      }
    },
  })
}
