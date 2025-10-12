import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import type { Team } from '@/types/api';

import { db } from '../db';

const getCurrentUser = (request: Request) => {
  const cookies = request.headers.get('cookie') || '';
  const authToken = cookies
    .split(';')
    .find((c) => c.trim().startsWith('auth-token='))
    ?.split('=')[1];

  if (!authToken) return null;

  try {
    const decoded = JSON.parse(atob(authToken));
    return db.user.findFirst({
      where: {
        id: {
          equals: decoded.id,
        },
      },
    });
  } catch {
    return null;
  }
};

export const teamsHandlers = [
  // GET /teams
  http.get(`${env.API_URL}/teams`, async ({ request }) => {
    // Teams list can be accessed by anyone (for registration page)
    // But if authenticated, verify the user exists
    const user = getCurrentUser(request);

    // If there's an auth token but user not found, return unauthorized
    const authHeader = request.headers.get('cookie');
    if (authHeader?.includes('auth-token=') && !user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const teams = db.team
      .findMany({
        where: {},
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const teamsData: Team[] = teams.map((team) => ({
      id: team.id,
      name: team.name,
      description: team.description,
      createdAt: team.createdAt,
    }));

    return HttpResponse.json({
      data: teamsData,
    });
  }),
];
