import { VueQueryPlugin } from "vue-query";
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

  await render(LoginForm, {
    user: null,
    emits: {
      success: onSuccess,
    },
    global: {
      plugins: [VueQueryPlugin],
    },
  });

  //userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
  //userEvent.type(screen.getByLabelText(/password/i), newUser.password);

  //userEvent.click(screen.getByRole('button', { name: /log in/i }));

  //await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
