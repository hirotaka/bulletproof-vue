type PathConfig = {
  path: string;
  getHref: (...args: string[]) => string;
};

type AuthPaths = {
  login: PathConfig;
  register: PathConfig;
};

type DiscussionsPaths = {
  list: PathConfig;
  detail: PathConfig;
};

type AppPaths = {
  root: PathConfig;
  dashboard: PathConfig;
  discussions: DiscussionsPaths;
  profile: PathConfig;
  users: PathConfig;
};

type Paths = {
  home: PathConfig;
  auth: AuthPaths;
  app: AppPaths;
};

export const paths: Paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  auth: {
    login: {
      path: '/auth/login',
      getHref: () => '/auth/login',
    },
    register: {
      path: '/auth/register',
      getHref: () => '/auth/register',
    },
  },
  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '/app/dashboard',
      getHref: () => '/app/dashboard',
    },
    discussions: {
      list: {
        path: '/app/discussions',
        getHref: () => '/app/discussions',
      },
      detail: {
        path: '/app/discussions/:id',
        getHref: (id: string) => `/app/discussions/${id}`,
      },
    },
    profile: {
      path: '/app/profile',
      getHref: () => '/app/profile',
    },
    users: {
      path: '/app/users',
      getHref: () => '/app/users',
    },
  },
};
