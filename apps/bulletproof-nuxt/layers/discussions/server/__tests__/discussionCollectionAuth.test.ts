import type { H3Event } from "h3";
import { createError } from "h3";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

const { createDiscussionRepository, requireUserSession } = vi.hoisted(() => ({
  createDiscussionRepository: vi.fn(),
  requireUserSession: vi.fn(),
}));

vi.mock("~discussions/server/repository/discussionRepository", () => ({
  createDiscussionRepository,
}));

beforeEach(() => {
  createDiscussionRepository.mockReset();
  requireUserSession.mockReset();
  vi.stubGlobal("defineEventHandler", <T>(eventHandler: T) => eventHandler);
  vi.stubGlobal("requireUserSession", requireUserSession);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("rejects an unauthenticated request before entering the discussion repository", async () => {
  const { default: handler } = await import("../api/discussions/index.get");
  requireUserSession.mockRejectedValueOnce(createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
  }));

  await expect(handler({} as H3Event)).rejects.toMatchObject({
    statusCode: 401,
  });

  expect(createDiscussionRepository).not.toHaveBeenCalled();
});
