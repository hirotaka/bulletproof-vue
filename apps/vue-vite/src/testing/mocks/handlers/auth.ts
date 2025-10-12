import { http, HttpResponse } from 'msw';
import { nanoid } from 'nanoid';

import { env } from '@/config/env';
import type { AuthResponse, User } from '@/types/api';

import { db, persistDb } from '../db';

const AUTH_COOKIE = 'auth-token';

type LoginBody = {
  email: string;
  password: string;
};

type RegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  teamId?: string;
  teamName?: string;
};

const getCurrentUser = (request: Request): User | null => {
  const cookies = request.headers.get('cookie') || '';
  const authToken = cookies
    .split(';')
    .find((c) => c.trim().startsWith(`${AUTH_COOKIE}=`))
    ?.split('=')[1];

  if (!authToken) return null;

  try {
    const decoded = JSON.parse(atob(authToken));
    const user = db.user.findFirst({
      where: {
        id: {
          equals: decoded.id,
        },
      },
    });
    return user ? { ...user, password: undefined } as User : null;
  } catch {
    return null;
  }
};

const createAuthCookie = (user: User): string => {
  const token = btoa(JSON.stringify({ id: user.id }));
  return `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`; // 7 days
};

export const authHandlers = [
  // POST /auth/login
  http.post(`${env.API_URL}/auth/login`, async ({ request }) => {
    try {
      const credentials = (await request.json()) as LoginBody;

      const user = db.user.findFirst({
        where: {
          email: {
            equals: credentials.email,
          },
        },
      });

      if (!user) {
        return HttpResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 },
        );
      }

      // In a real app, you would verify the password hash
      // For mock purposes, we'll just check if it exists
      if (user.password !== credentials.password) {
        return HttpResponse.json(
          { message: 'Invalid email or password' },
          { status: 401 },
        );
      }

      const { password, ...userWithoutPassword } = user;

      const result: AuthResponse = {
        jwt: btoa(JSON.stringify({ id: user.id })),
        user: userWithoutPassword as User,
      };

      return HttpResponse.json(result, {
        headers: {
          'Set-Cookie': createAuthCookie(userWithoutPassword as User),
        },
      });
    } catch (error) {
      return HttpResponse.json(
        { message: 'An error occurred during login' },
        { status: 500 },
      );
    }
  }),

  // POST /auth/register
  http.post(`${env.API_URL}/auth/register`, async ({ request }) => {
    try {
      const data = (await request.json()) as RegisterBody;

      // Check if user already exists
      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: data.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 },
        );
      }

      // Create or find team
      let teamId = data.teamId;

      if (!teamId && data.teamName) {
        // Create new team
        const team = db.team.create({
          name: data.teamName,
          description: `Team ${data.teamName}`,
        });
        teamId = team.id;
        await persistDb('team');
      } else if (!teamId) {
        // Default to first team if no team specified
        const firstTeam = db.team.findFirst({
          where: {},
        });
        teamId = firstTeam?.id || '';
      }

      // Create user
      const user = db.user.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        teamId,
        role: 'USER',
        bio: '',
      });

      await persistDb('user');

      const { password, ...userWithoutPassword } = user;

      const result: AuthResponse = {
        jwt: btoa(JSON.stringify({ id: user.id })),
        user: userWithoutPassword as User,
      };

      return HttpResponse.json(result, {
        status: 201,
        headers: {
          'Set-Cookie': createAuthCookie(userWithoutPassword as User),
        },
      });
    } catch (error) {
      return HttpResponse.json(
        { message: 'An error occurred during registration' },
        { status: 500 },
      );
    }
  }),

  // GET /auth/me
  http.get(`${env.API_URL}/auth/me`, async ({ request }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({ data: user });
  }),

  // POST /auth/logout
  http.post(`${env.API_URL}/auth/logout`, () => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
        },
      },
    );
  }),
];
