import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

// TODO: Task 0.4.4 - Import handlers from individual files
// import { authHandlers } from './auth';
// import { commentsHandlers } from './comments';
// import { discussionsHandlers } from './discussions';
// import { teamsHandlers } from './teams';
// import { usersHandlers } from './users';

export const handlers = [
  // TODO: Task 0.4.4 - Uncomment when handlers are created
  // ...authHandlers,
  // ...commentsHandlers,
  // ...discussionsHandlers,
  // ...teamsHandlers,
  // ...usersHandlers,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
