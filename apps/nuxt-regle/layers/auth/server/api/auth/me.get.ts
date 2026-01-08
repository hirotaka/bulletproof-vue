import { defineEventHandler, createError } from "h3";
import { createUserRepository } from "#layers/users/server/repository/userRepository";

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);

    if (!session || !session.user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    // Create repository
    const userRepository = await createUserRepository(event);

    // Get fresh user data from database
    interface SessionUser {
      id: string;
      email: string;
      role: string;
    }
    const sessionUser = session.user as SessionUser;
    const user = await userRepository.findById(sessionUser.id);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        role: user.role,
        teamId: user.teamId,
        createdAt: user.createdAt,
      },
    };
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
