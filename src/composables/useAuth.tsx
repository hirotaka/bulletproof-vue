import { provide, inject } from "vue";
import { BaseSpinner } from "@/components/Elements";
import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
} from "@/features/auth";
import type {
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from "@/features/auth";
import storage from "@/utils/storage";

import { initVueQueryAuth } from "@/lib/vue-query-auth";

const key = Symbol();

async function handleUserResponse(data: UserResponse) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }

  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

function isAuthenticated() {
  return !!storage.getToken();
}
const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div class="w-screen h-screen flex justify-center items-center">
        <BaseSpinner size="xl" />
      </div>
    );
  },
};

function createContext() {
  return initVueQueryAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO
  >(authConfig);
}

function provideAuth() {
  const context = createContext();
  provide(key, context);

  return context;
}

function useAuth() {
  return inject(key);
}

export { provideAuth, useAuth, isAuthenticated };
