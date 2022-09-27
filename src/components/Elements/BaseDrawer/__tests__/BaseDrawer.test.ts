import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import TestDrawer from "./TestDrawer.vue";

const openButtonText = "Open Drawer";
const titleText = "Drawer Title";
const cancelButtonText = "Cancel";
const drawerContentText = "Hello From Drawer";

test("should handle basic drawer flow", async () => {
  await render(TestDrawer, {
    props: {
      openButtonText,
      cancelButtonText,
      titleText,
      drawerContentText,
    },
  });

  expect(screen.queryByText(titleText)).not.toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", {
      name: openButtonText,
    })
  );

  expect(screen.getByText(titleText)).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", {
      name: cancelButtonText,
    })
  );

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  );
});
