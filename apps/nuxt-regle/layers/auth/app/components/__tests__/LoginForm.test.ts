import { expect, test, vi, beforeEach } from "vitest";
import LoginForm from "../LoginForm.vue";
import { createUser } from "~~/test/data-generators";
import { renderComponent, screen, userEvent, waitFor } from "~~/test/test-utils";

// Create a typed mock for $fetch
const mockFetch = vi.fn();

// Mock $fetch globally
beforeEach(() => {
  vi.stubGlobal("$fetch", mockFetch);
  mockFetch.mockReset();
});

test("should login new user and call onSuccess cb which should navigate the user to the app", async () => {
  const newUser = createUser({ teamId: undefined });
  const onSuccess = vi.fn();

  // Mock successful login response
  const mockUser = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    teamId: newUser.teamId,
    role: "USER",
    createdAt: Date.now(),
  };

  mockFetch.mockResolvedValue({ user: mockUser });

  await renderComponent(LoginForm, {
    props: { onSuccess },
  });

  // Fill in the form
  await userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
  await userEvent.type(screen.getByLabelText(/password/i), newUser.password);

  // Submit the form
  await userEvent.click(screen.getByRole("button", { name: /log in/i }));

  // Wait for the onSuccess callback to be called
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));

  // Verify $fetch was called with correct parameters
  expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
    method: "POST",
    body: {
      email: newUser.email,
      password: newUser.password,
    },
  });
});
