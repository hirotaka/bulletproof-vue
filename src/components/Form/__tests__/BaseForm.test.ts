import { render, screen, waitFor, userEvent } from "@/test/test-utils";
import TestFormView from "./TestFormView.vue";

import type { Mock } from "vitest";

const testData = {
  title: "Hello World",
};

const TestForm = (handleSubmit: Mock) => {
  return {
    components: { TestFormView },
    template: `<TestFormView :handleSubmit="handleSubmit" />`,
    data() {
      return {
        handleSubmit: handleSubmit,
      };
    },
  };
};

test("should render and submit a basic Form component", async () => {
  const handleSubmit = vi.fn();

  await render(TestForm(handleSubmit));

  await userEvent.type(screen.getByLabelText(/title/i), testData.title);

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything())
  );
});

test("should fail submission if validation fails", async () => {
  const handleSubmit = vi.fn();

  await render(TestForm(handleSubmit));

  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await screen.findByRole(/alert/i, { name: /required/i });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
