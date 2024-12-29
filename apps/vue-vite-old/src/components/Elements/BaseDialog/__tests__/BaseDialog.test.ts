import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import TestDialogView from "./TestDialogView.vue";

const openButtonText = "Open Modal";
const cancelButtonText = "Cancel";
const titleText = "Modal Title";

test("should handle basic dialog flow", async () => {
  const TestDialog = {
    components: { TestDialogView },
    template: `
      <TestDialogView
        :openButtonText="openButtonText"
        :cancelButtonText="cancelButtonText"
        :titleText="titleText"
      />
    `,
    data() {
      return {
        openButtonText,
        cancelButtonText,
        titleText,
      };
    },
  };

  await render(TestDialog);

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: cancelButtonText }));

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  );
});
