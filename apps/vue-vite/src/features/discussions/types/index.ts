import { z } from 'zod';

import type { Discussion } from '@/types/api';

export type { Discussion };

export const createDiscussionInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type CreateDiscussionInput = z.infer<typeof createDiscussionInputSchema>;

export const updateDiscussionInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  body: z.string().min(1, 'Required'),
});

export type UpdateDiscussionInput = z.infer<typeof updateDiscussionInputSchema>;
