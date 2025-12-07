import { defineEventHandler, readBody, createError } from "h3";
import { createCommentInputSchema } from "~comments/shared/schemas";
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

    const body = await readBody(event);

    // Validate input
    const validationResult = createCommentInputSchema.safeParse(body);
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validationResult.error.issues,
      });
    }

    const { body: commentBody, discussionId } = validationResult.data;

    // Create repository
    const commentRepository = await createCommentRepository(event);

    // Create comment
    const comment = await commentRepository.create({
      body: commentBody,
      discussionId,
      authorId: sessionUser.id,
    });

    return { data: comment };
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
