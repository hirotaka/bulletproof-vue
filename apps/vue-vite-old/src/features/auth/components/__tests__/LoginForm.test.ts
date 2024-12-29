import {
  createUser,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/test/test-utils";

import { LoginForm } from "../";

test("should login new user and call onSuccess cb which should navigate the user to the app", async () => {
  const newUser = await createUser({ teamId: undefined });

  const onSuccess = vi.fn();

  const loginForm = {
    components: { LoginForm },
    template: `<LoginForm @success="onSuccess" />`,
    methods: {
      onSuccess: onSuccess,
    },
  };

  await render(loginForm, {
    user: null,
  });

  await userEvent.type(screen.getByLabelText(/email address/i), newUser.email);

  await userEvent.type(screen.getByLabelText(/password/i), newUser.password);

  await userEvent.click(screen.getByRole("button", { name: /log in/i }));

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
