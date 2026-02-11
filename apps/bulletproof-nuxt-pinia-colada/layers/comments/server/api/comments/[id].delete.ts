import { defineEventHandler, createError, getRouterParam } from "h3";
import { createCommentRepository } from "~comments/server/repository/commentRepository";

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);

    if (!session || !session.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    interface SessionUser {
      id: string;
      email: string;
      role: string;
      teamId?: string;
    }

    const sessionUser = session.user as SessionUser;

    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Comment ID is required",
      });
    }

    // Create repository
    const commentRepository = await createCommentRepository(event);

    // Find comment
    const existingComment = await commentRepository.findById(id);

    if (!existingComment) {
      throw createError({
        statusCode: 404,
        statusMessage: "Comment not found",
      });
    }

    // Check if user is the author or admin
    const isAuthor = existingComment.authorId === sessionUser.id;
    const isAdmin = sessionUser.role === "ADMIN";

    if (!isAuthor && !isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage:
          "Forbidden - Only the author or admin can delete this comment",
      });
    }

    // Delete comment
    await commentRepository.delete(id);

    return { success: true };
  }
  catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
    });
  }
});
