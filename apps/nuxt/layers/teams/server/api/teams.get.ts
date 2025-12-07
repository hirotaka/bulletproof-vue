import { defineEventHandler, createError } from "h3";
import { createTeamRepository } from "~teams/server/repository/teamRepository";

export default defineEventHandler(async (event) => {
  try {
    // Create repository
    const teamRepository = await createTeamRepository(event);

    const teams = await teamRepository.findAll();

    return teams;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch teams",
    });
  }
});
