import { defineEventHandler, createError, getRouterParam } from "h3";
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

    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Discussion ID is required",
      });
    }

    // Create repository
    const discussionRepository = await createDiscussionRepository(event);

    // Find discussion and ensure it belongs to user's team
    const existingDiscussion = await discussionRepository.findByIdAndTeam(
      id,
      sessionUser.teamId,
    );

    if (!existingDiscussion) {
      throw createError({
        statusCode: 404,
        statusMessage: "Discussion not found",
      });
    }

    // Check if user is the author
    if (existingDiscussion.authorId !== sessionUser.id) {
      throw createError({
        statusCode: 403,
        statusMessage: "Forbidden - Only the author can delete this discussion",
      });
    }

    // Delete discussion
    await discussionRepository.delete(id);

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
