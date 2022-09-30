import {
  render as vtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

// import { FunctionComponent } from "react";
import { VueQueryPlugin } from "vue-query";
import { createHead } from "@vueuse/head";

// TODO: Avoid dependency
import { createPinia } from "pinia";
import router from "@/router";

import { AppProvider } from "@/providers";
import storage from "@/utils/storage";

import { discussionGenerator, userGenerator } from "./data-generators";
import { db } from "./server/db";
import { authenticate, hash } from "./server/utils";

export const createUser = async (userProperties?: any) => {
  const user = userGenerator(userProperties);
  await db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const createDiscussion = async (discussionProperties?: any) => {
  const discussion = discussionGenerator(discussionProperties);
  const res = await db.discussion.create(discussion);
  return res;
};

export const loginAsUser = async (user: any) => {
  const authUser = await authenticate(user);
  storage.setToken(authUser.jwt);
  return authUser;
};

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  );

const initializeUser = async (user: any) => {
  if (typeof user === "undefined") {
    return await loginAsUser(await createUser());
  } else if (user) {
    return await loginAsUser(user);
  } else {
    return null;
  }
};

export const render = async (
  ui: any,
  { user, ...renderOptions }: Record<string, any> = {}
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user);

  //   window.history.pushState({}, "Test page", route);

  const app = {
    components: { AppProvider, ui },
    template: `<AppProvider><ui /></AppProvider>`,
  };

  const head = createHead();
  const pinia = createPinia();

  const returnValue = {
    ...vtlRender(app, {
      ...renderOptions,
      global: {
        plugins: [VueQueryPlugin, head, router, pinia],
      },
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export { screen, waitFor, within } from "@testing-library/vue";
export { userEvent, vtlRender };
