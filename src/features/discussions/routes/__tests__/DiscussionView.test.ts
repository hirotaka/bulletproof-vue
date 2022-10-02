import { useRoute as useMockRoute } from "vue-router";

import {
  render,
  screen,
  userEvent,
  waitFor,
  createDiscussion,
  createUser,
  within,
} from "@/test/test-utils";

import { DiscussionView } from "../";

vi.mock("vue-router", async () => {
  const vueRouter = await vi.importActual("vue-router");

  return { ...vueRouter, useRoute: vi.fn() };
});

const renderDiscussion = async () => {
  const fakeUser = await createUser();
  const fakeDiscussion = await createDiscussion({ teamId: fakeUser.teamId });

  (useMockRoute as vi.Mock).mockImplementation(() => ({
    params: { id: fakeDiscussion.id },
  }));

  const utils = await render(DiscussionView, {
    user: fakeUser,
  });

  await screen.findByText(fakeDiscussion.title);

  return {
    ...utils,
    fakeUser,
    fakeDiscussion,
  };
};

test("should render discussion", async () => {
  const { fakeDiscussion } = await renderDiscussion();
  expect(screen.getByText(fakeDiscussion.body)).toBeInTheDocument();
});

test("should update discussion", async () => {
  const { fakeDiscussion } = await renderDiscussion();

  const titleUpdate = "-Updated";
  const bodyUpdate = "-Updated";

  await userEvent.click(
    screen.getByRole("button", { name: /update discussion/i })
  );

  const drawer = screen.getByRole("dialog", {
    name: /update discussion/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  await userEvent.type(titleField, titleUpdate);
  await userEvent.type(bodyField, bodyUpdate);

  const submitButton = within(drawer).getByRole("button", {
    name: /submit/i,
  });

  await userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const newTitle = `${fakeDiscussion.title}${titleUpdate}`;
  const newBody = `${fakeDiscussion.body}${bodyUpdate}`;

  expect(screen.getByText(newTitle)).toBeInTheDocument();
  expect(screen.getByText(newBody)).toBeInTheDocument();
});
