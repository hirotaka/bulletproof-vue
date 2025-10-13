import {
  QueryClient,
  type QueryClientConfig,
  type UseMutationOptions,
} from '@tanstack/vue-query';

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Throw errors instead of storing them in state
      throwOnError: true,
      // Refetch on window focus (only in production)
      refetchOnWindowFocus: import.meta.env.PROD,
      // Retry failed requests (only in production)
      retry: import.meta.env.PROD ? 3 : false,
      // Time before data is considered stale (5 seconds)
      staleTime: 1000 * 5,
    },
    mutations: {
      // Throw errors for mutations
      throwOnError: true,
    },
  },
};

export const queryClient = new QueryClient(queryConfig);

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
