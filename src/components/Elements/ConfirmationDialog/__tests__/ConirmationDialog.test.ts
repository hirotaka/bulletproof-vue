import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import ConfirmationDialog from "../ConfirmationDialog.vue";
import { BaseButton } from "../../BaseButton";

test("should handle confirmation flow", async () => {
  const titleText = "Are you sure?";
  const bodyText = "Are you sure you want to delete this item?";
  const confirmationButtonText = "Confirm";
  const openButtonText = "Open";

  const TestConfirmationDialog = {
    components: { ConfirmationDialog, BaseButton },
    template: `
      <ConfirmationDialog icon="danger" :title="titleText" :body="bodyText">
        <template #triggerButton>
          <BaseButton>${openButtonText}</BaseButton>
        </template>
        <template #confirmationButton>
          <BaseButton>${confirmationButtonText}</BaseButton>
        </template>
      </ConfirmationDialog>
    `,
    data() {
      return {
        titleText,
        bodyText,
        confirmationButtonText,
        openButtonText,
      };
    },
  };

  await render(TestConfirmationDialog);

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
