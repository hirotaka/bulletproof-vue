import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import TestDialog from "./TestDialog.vue";

const openButtonText = "Open Modal";
const cancelButtonText = "Cancel";
const titleText = "Modal Title";

test("should handle basic dialog flow", async () => {
  await render(TestDialog, {
    props: {
      openButtonText,
      cancelButtonText,
      titleText,
    },
  });

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: cancelButtonText }));

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  );
});
