import { http, HttpResponse } from 'msw';

import { env } from '@/config/env';
import type { Discussion, Meta } from '@/types/api';

import { db, persistDb } from '../db';

const DISCUSSIONS_PER_PAGE = 10;

type CreateDiscussionBody = {
  title: string;
  body: string;
};

type UpdateDiscussionBody = {
  title?: string;
  body?: string;
};

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

export const discussionsHandlers = [
  // GET /discussions
  http.get(`${env.API_URL}/discussions`, async ({ request }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);

    // Get all discussions for user's team
    const allDiscussions = db.discussion
      .findMany({
        where: {
          teamId: {
            equals: user.teamId,
          },
        },
      })
      .sort((a, b) => b.createdAt - a.createdAt);

    const total = allDiscussions.length;
    const totalPages = Math.ceil(total / DISCUSSIONS_PER_PAGE);
    const start = (page - 1) * DISCUSSIONS_PER_PAGE;
    const end = start + DISCUSSIONS_PER_PAGE;

    const paginatedDiscussions = allDiscussions.slice(start, end);

    // Populate author information
    const discussionsWithAuthor = paginatedDiscussions.map((discussion) => {
      const author = db.user.findFirst({
        where: {
          id: {
            equals: discussion.authorId,
          },
        },
      });

      const { password, ...authorWithoutPassword } = author || {};

      return {
        ...discussion,
        author: authorWithoutPassword,
      };
    });

    const meta: Meta = {
      page,
      total,
      totalPages,
    };

    return HttpResponse.json({
      data: discussionsWithAuthor,
      meta,
    });
  }),

  // GET /discussions/:id
  http.get(`${env.API_URL}/discussions/:id`, async ({ request, params }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const discussion = db.discussion.findFirst({
      where: {
        id: {
          equals: id as string,
        },
      },
    });

    if (!discussion) {
      return HttpResponse.json(
        { message: 'Discussion not found' },
        { status: 404 },
      );
    }

    // Check if user has access to this discussion (same team)
    if (discussion.teamId !== user.teamId) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Populate author information
    const author = db.user.findFirst({
      where: {
        id: {
          equals: discussion.authorId,
        },
      },
    });

    const { password, ...authorWithoutPassword } = author || {};

    const discussionWithAuthor: Discussion = {
      id: discussion.id,
      title: discussion.title,
      body: discussion.body,
      teamId: discussion.teamId,
      author: authorWithoutPassword,
      createdAt: discussion.createdAt,
    };

    return HttpResponse.json({ data: discussionWithAuthor });
  }),

  // POST /discussions
  http.post(`${env.API_URL}/discussions`, async ({ request }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
      const data = (await request.json()) as CreateDiscussionBody;

      const discussion = db.discussion.create({
        title: data.title,
        body: data.body,
        authorId: user.id,
        teamId: user.teamId,
      });

      await persistDb('discussion');

      const { password, ...authorWithoutPassword } = user;

      const discussionWithAuthor: Discussion = {
        id: discussion.id,
        title: discussion.title,
        body: discussion.body,
        teamId: discussion.teamId,
        author: authorWithoutPassword,
        createdAt: discussion.createdAt,
      };

      return HttpResponse.json({ data: discussionWithAuthor }, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { message: 'An error occurred while creating discussion' },
        { status: 500 },
      );
    }
  }),

  // PATCH /discussions/:id
  http.patch(`${env.API_URL}/discussions/:id`, async ({ request, params }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const discussion = db.discussion.findFirst({
      where: {
        id: {
          equals: id as string,
        },
      },
    });

    if (!discussion) {
      return HttpResponse.json(
        { message: 'Discussion not found' },
        { status: 404 },
      );
    }

    // Check if user is the author or admin
    if (discussion.authorId !== user.id && user.role !== 'ADMIN') {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
      const updates = (await request.json()) as UpdateDiscussionBody;

      const updatedDiscussion = db.discussion.update({
        where: {
          id: {
            equals: id as string,
          },
        },
        data: updates,
      });

      await persistDb('discussion');

      const author = db.user.findFirst({
        where: {
          id: {
            equals: updatedDiscussion.authorId,
          },
        },
      });

      const { password, ...authorWithoutPassword } = author || {};

      const discussionWithAuthor: Discussion = {
        id: updatedDiscussion.id,
        title: updatedDiscussion.title,
        body: updatedDiscussion.body,
        teamId: updatedDiscussion.teamId,
        author: authorWithoutPassword,
        createdAt: updatedDiscussion.createdAt,
      };

      return HttpResponse.json({ data: discussionWithAuthor });
    } catch (error) {
      return HttpResponse.json(
        { message: 'An error occurred while updating discussion' },
        { status: 500 },
      );
    }
  }),

  // DELETE /discussions/:id
  http.delete(`${env.API_URL}/discussions/:id`, async ({ request, params }) => {
    const user = getCurrentUser(request);

    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const discussion = db.discussion.findFirst({
      where: {
        id: {
          equals: id as string,
        },
      },
    });

    if (!discussion) {
      return HttpResponse.json(
        { message: 'Discussion not found' },
        { status: 404 },
      );
    }

    // Check if user is the author or admin
    if (discussion.authorId !== user.id && user.role !== 'ADMIN') {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    db.discussion.delete({
      where: {
        id: {
          equals: id as string,
        },
      },
    });

    await persistDb('discussion');

    // Also delete associated comments
    const comments = db.comment.findMany({
      where: {
        discussionId: {
          equals: id as string,
        },
      },
    });

    comments.forEach((comment) => {
      db.comment.delete({
        where: {
          id: {
            equals: comment.id,
          },
        },
      });
    });

    await persistDb('comment');

    return HttpResponse.json({ message: 'Discussion deleted successfully' });
  }),
];
