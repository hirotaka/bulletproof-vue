import { defineEventHandler, readBody, createError } from "h3";
import { createDiscussionInputSchema } from "~discussions/shared/schemas";
import { createDiscussionRepository } from "~discussions/server/repository/discussionRepository";

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

    if (!sessionUser.teamId) {
      throw createError({
        statusCode: 400,
        statusMessage: "User must belong to a team",
      });
    }

    const body = await readBody(event);

    // Validate input
    const validationResult = createDiscussionInputSchema.safeParse(body);
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validationResult.error.issues,
      });
    }

    const { title, body: discussionBody } = validationResult.data;

    // Create repository
    const discussionRepository = await createDiscussionRepository(event);

    // Create discussion
    const discussion = await discussionRepository.create({
      title,
      body: discussionBody,
      authorId: sessionUser.id,
      teamId: sessionUser.teamId,
    });

    return { discussion };
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
