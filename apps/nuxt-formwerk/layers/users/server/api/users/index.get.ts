import { createUserRepository } from "~users/server/repository/userRepository";

interface SessionUser {
  id: string;
  email: string;
  role: string;
  teamId: string;
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const sessionUser = session.user as SessionUser;

  // Only ADMIN can view users list
  if (sessionUser.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden - Admin access required",
    });
  }

  // Create repository
  const userRepository = await createUserRepository(event);

  const users = await userRepository.findAll(sessionUser.teamId);

  return {
    data: users,
  };
});
