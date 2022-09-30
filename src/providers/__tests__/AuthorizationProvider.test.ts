import { createUser, render, screen } from "@/test/test-utils";

import { AuthorizationProvider } from "../";
import { ROLES } from "@/composables/useAuthorization";

test("should view protected resource if user role is matching", async () => {
  const user = await createUser({
    role: ROLES.ADMIN,
  });

  const protectedResource = "This is very confidential data";

  const TestAuthorizationProvider = {
    components: { AuthorizationProvider },
    template: `
      <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
        {{ protectedResource }}
      </AuthorizationProvider>
    `,
    data() {
      return {
        protectedResource,
        ROLES,
      };
    },
  };

  await render(TestAuthorizationProvider, { user });

  expect(screen.getByText(protectedResource)).toBeInTheDocument();
});

test("should not view protected resource if user role does not match and show fallback message instead", async () => {
  const user = await createUser({
    role: ROLES.USER,
  });

  const protectedResource = "This is very confidential data";

  const forbiddenMessage = "You are unauthorized to view this resource";

  const TestAuthorizationProvider = {
    components: { AuthorizationProvider },
    template: `
      <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
        <template #forbiddenFallback>
          {{ forbiddenMessage }}
        </template>
        {{ protectedResource }}
      </AuthorizationProvider>
    `,
    data() {
      return {
        protectedResource,
        forbiddenMessage,
        ROLES,
      };
    },
  };

  await render(TestAuthorizationProvider, { user });

  expect(screen.queryByText(protectedResource)).not.toBeInTheDocument();

  expect(screen.getByText(forbiddenMessage)).toBeInTheDocument();
});

test("should view protected resource if policy check passes", async () => {
  const user = await createUser({
    role: ROLES.ADMIN,
  });

  const protectedResource = "This is very confidential data";

  const TestAuthorizationProvider = {
    components: { AuthorizationProvider },
    template: `
      <AuthorizationProvider :policyCheck=true>
        {{ protectedResource }}
      </AuthorizationProvider>
    `,
    data() {
      return {
        protectedResource,
        ROLES,
      };
    },
  };

  await render(TestAuthorizationProvider, { user });

  expect(screen.getByText(protectedResource)).toBeInTheDocument();
});

test("should not view protected resource if policy check fails and show fallback message instead", async () => {
  const user = await createUser({
    role: ROLES.USER,
  });

  const protectedResource = "This is very confidential data";

  const forbiddenMessage = "You are unauthorized to view this resource";

  const TestAuthorizationProvider = {
    components: { AuthorizationProvider },
    template: `
      <AuthorizationProvider :policyCheck=false>
        <template #forbiddenFallback>
          {{ forbiddenMessage }}
        </template>
        {{ protectedResource }}
      </AuthorizationProvider>
    `,
    data() {
      return {
        protectedResource,
        forbiddenMessage,
        ROLES,
      };
    },
  };

  await render(TestAuthorizationProvider, { user });

  expect(screen.queryByText(protectedResource)).not.toBeInTheDocument();

  expect(screen.getByText(forbiddenMessage)).toBeInTheDocument();
});
