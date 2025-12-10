import { defineEventHandler, createError, getQuery } from "h3";
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

    // Get pagination params from query
    const query = getQuery(event);
    const page = parseInt((query.page as string) || "1", 10);
    const limit = parseInt((query.limit as string) || "10", 10);

    // Validate pagination params
    if (page < 1 || limit < 1 || limit > 100) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid pagination parameters",
      });
    }

    // Create repository
    const discussionRepository = await createDiscussionRepository(event);

    const result = await discussionRepository.findAll({
      teamId: sessionUser.teamId,
      page,
      limit,
    });

    return result;
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
