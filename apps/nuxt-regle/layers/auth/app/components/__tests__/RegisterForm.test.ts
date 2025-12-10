import { expect, test, vi, beforeEach } from "vitest";
import RegisterForm from "../RegisterForm.vue";
import { createUser } from "~~/test/data-generators";
import { renderComponent, screen, userEvent, waitFor } from "~~/test/test-utils";

// Mock vue-router's useRoute
vi.mock("vue-router", async () => {
  const actual = await vi.importActual("vue-router");
  return {
    ...actual,
    useRoute: vi.fn(() => ({
      query: {},
      params: {},
      path: '/auth/register',
    })),
  };
});

// Create a typed mock for $fetch
const mockFetch = vi.fn();

// Mock $fetch globally
beforeEach(() => {
  vi.stubGlobal("$fetch", mockFetch);
  mockFetch.mockReset();
});

test("should register new user and call onSuccess cb which should navigate the user to the app", async () => {
  const newUser = createUser({});
  const onSuccess = vi.fn();
  const setChooseTeam = vi.fn();

  // Mock successful register response
  const mockUser = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    teamId: newUser.teamId,
    role: "USER",
    createdAt: Date.now(),
  };

  // Mock the teams API call first (for the component's onMounted)
  mockFetch.mockResolvedValueOnce([]);

  await renderComponent(RegisterForm, {
    url: '/auth/register',
    path: '/auth/register',
    props: {
      onSuccess,
      chooseTeam: false,
      setChooseTeam,
    },
  });

  // Mock the register API call
  mockFetch.mockResolvedValueOnce({ user: mockUser });

  // Fill in the form
  await userEvent.type(screen.getByLabelText(/first name/i), newUser.firstName);
  await userEvent.type(screen.getByLabelText(/last name/i), newUser.lastName);
  await userEvent.type(screen.getByLabelText(/email address/i), newUser.email);
  await userEvent.type(screen.getByLabelText(/password/i), newUser.password);
  await userEvent.type(screen.getByLabelText(/team name/i), newUser.teamName);

  // Submit the form
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  // Wait for the onSuccess callback to be called
  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));

  // Verify $fetch was called with correct parameters (skip the first call which is for teams)
  const registerCall = mockFetch.mock.calls.find(
    (call) => call[0] === "/api/auth/register"
  );
  expect(registerCall).toBeDefined();
  expect(registerCall?.[1]).toMatchObject({
    method: "POST",
    body: {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: newUser.password,
      teamName: newUser.teamName,
      teamId: null,
    },
  });
});
