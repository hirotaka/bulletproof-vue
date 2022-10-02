import type { Ref, VNode } from "vue";

import { useQuery, useMutation, useQueryClient } from "vue-query";
import type {
  MutateFunction,
  RefetchOptions,
  QueryObserverResult,
} from "react-query/types/core";

export interface AuthProviderConfig<User = unknown, Error = unknown> {
  key?: string;
  loadUser: (data: any) => Promise<User>;
  loginFn: (data: any) => Promise<User>;
  registerFn: (data: any) => Promise<User>;
  logoutFn: () => Promise<any>;
  waitInitial?: boolean;
  LoaderComponent?: () => VNode;
  ErrorComponent?: ({ error }: { error: Error | null }) => VNode;
}

export function initVueQueryAuth<
  User = unknown,
  Error = unknown,
  LoginCredentials = unknown,
  RegisterCredentials = unknown
>(
  config: AuthProviderConfig<User, Error>
): {
  user: User | undefined;
  login: MutateFunction<User, any, LoginCredentials>;
  logout: MutateFunction<any, any, void, any>;
  register: MutateFunction<User, any, RegisterCredentials>;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isRegistering: boolean;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User, Error>>;
  error: Error | null;
  isLoading: Ref<boolean>;
  isSuccess: Ref<boolean>;
  isIdle: Ref<boolean>;
} {
  const {
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    key = "auth-user",
    waitInitial = true,
    LoaderComponent = () => <div>Loading...</div>,
    ErrorComponent = (error: any) => (
      <div style={{ color: "tomato" }}>{JSON.stringify(error, null, 2)}</div>
    ),
  } = config;

  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    status,
    isLoading,
    isIdle,
    isSuccess,
    refetch,
  } = useQuery<User, Error>({
    queryKey: key,
    queryFn: loadUser,
  });

  const setUser = (data: User) => {
    queryClient.setQueryData(key, data);
  };

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (user) => {
      setUser(user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: (user) => {
      setUser(user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = {
    user,
    error,
    refetchUser: refetch,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isLoading,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isLoading,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isLoading,
  };

  return {
    ...value,
    isIdle,
    isSuccess,
    isLoading,
    status,
    error,
    waitInitial,
    LoaderComponent,
    ErrorComponent,
  };
}
