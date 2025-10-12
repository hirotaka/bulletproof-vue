import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

// TODO: Import handlers from other files when they are implemented
// import { authHandlers } from './auth';
// import { commentsHandlers } from './comments';
// import { discussionsHandlers } from './discussions';
// import { teamsHandlers } from './teams';
// import { usersHandlers } from './users';

export const handlers = [
  // TODO: Add handlers when implemented
  // ...authHandlers,
  // ...commentsHandlers,
  // ...discussionsHandlers,
  // ...teamsHandlers,
  // ...usersHandlers,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    return HttpResponse.json({ ok: true });
  }),
];
