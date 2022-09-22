import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import BaseButton from "../BaseButton.vue";
import ConfirmationDialog from "../ConfirmationDialog.vue";

test("should handle confirmation flow", async () => {
  const titleText = "Are you sure?";
  const bodyText = "Are you sure you want to delete this item?";
  const confirmationButtonText = "Confirm";
  const openButtonText = "Open";

  render(ConfirmationDialog, {
    global: {
      components: { BaseButton },
    },
    props: {
      icon: "danger",
      title: titleText,
      body: bodyText,
    },
    slots: {
      triggerButton: `<BaseButton>${openButtonText}</BaseButton>`,
      confirmButton: `<BaseButton>${confirmationButtonText}</BaseButton>`,
    },
  });

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: openButtonText }));

  expect(screen.getByText(titleText)).toBeInTheDocument();

  expect(screen.getByText(bodyText)).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  );

  expect(screen.queryByText(bodyText)).not.toBeInTheDocument();
});
