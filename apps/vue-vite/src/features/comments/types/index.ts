import { z } from 'zod'

import type { Comment } from '@/types/api'

export type { Comment }

export const createCommentInputSchema = z.object({
  discussionId: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
})

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>
