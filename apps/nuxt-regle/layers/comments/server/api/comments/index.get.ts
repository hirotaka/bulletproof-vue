import { defineEventHandler, getQuery, createError } from "h3";
import { createCommentRepository } from "~comments/server/repository/commentRepository";
import type { PaginatedComments } from "~comments/shared/types";

export default defineEventHandler(async (event): Promise<PaginatedComments> => {
  try {
    const query = getQuery(event);
    const discussionId = query.discussionId as string;
    const page = parseInt((query.page as string) || "1", 10);
    const limit = parseInt((query.limit as string) || "10", 10);

    if (!discussionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "discussionId is required",
      });
    }

    // Create repository
    const commentRepository = await createCommentRepository(event);

    const comments = await commentRepository.findByDiscussionId({
      discussionId,
      page,
      limit,
    });

    return comments;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
    });
  }
});
