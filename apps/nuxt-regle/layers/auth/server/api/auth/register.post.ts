import { defineEventHandler, readBody, createError } from "h3";
import { createUserRepository } from "#layers/users/server/repository/userRepository";
import { createTeamRepository } from "#layers/teams/server/repository/teamRepository";
import { registerInputSchema } from "~auth/shared/schemas";
import { customHashPassword } from "~auth/server/utils/password";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate input
    const validationResult = registerInputSchema.safeParse(body);
    if (!validationResult.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validationResult.error.issues,
      });
    }

    const data = validationResult.data;

    // Create repositories
    const userRepository = await createUserRepository(event);
    const teamRepository = await createTeamRepository(event);

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: "User with this email already exists",
      });
    }

    // Determine teamId and role
    let teamId: string;
    let role: "ADMIN" | "USER" = "USER";

    if (data.teamId) {
      // Join existing team
      const team = await teamRepository.findById(data.teamId);
      if (!team) {
        throw createError({
          statusCode: 400,
          statusMessage: "Team not found",
        });
      }
      teamId = data.teamId;
      role = "USER";
    } else if (data.teamName) {
      // Create new team - first member becomes ADMIN
      const newTeam = await teamRepository.create(data.teamName);
      teamId = newTeam.id;
      role = "ADMIN";
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "Either teamId or teamName must be provided",
      });
    }

    // Hash password
    const hashedPassword = await customHashPassword(data.password);

    // Create user
    const user = await userRepository.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
      teamId,
      role,
    });

    // Set session
    await setUserSession(event, {
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
    });

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
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Server Error",
    });
  }
});
