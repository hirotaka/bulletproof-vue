import { render, screen, userEvent, waitFor } from "@/test/test-utils";

import TestDrawerView from "./TestDrawerView.vue";

const openButtonText = "Open Drawer";
const titleText = "Drawer Title";
const cancelButtonText = "Cancel";
const drawerContentText = "Hello From Drawer";

test("should handle basic drawer flow", async () => {
  const TestDrawer = {
    components: { TestDrawerView },
    template: `
      <TestDrawerView
        :openButtonText="openButtonText"
        :cancelButtonText="cancelButtonText"
        :titleText="titleText"
        :drawerContentText="drawerContentText"
       />
    `,
    data() {
      return {
        openButtonText,
        cancelButtonText,
        titleText,
        drawerContentText,
      };
    },
  };

  await render(TestDrawer, {
    user: null,
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
