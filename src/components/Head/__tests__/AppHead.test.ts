import { render, waitFor } from "@/test/test-utils";

import AppHead from "../AppHead.vue";

test("should add proper page title and meta description", async () => {
  const title = "Hello World";
  const titleSuffix = " | Bulletproof Vue";
  const description = "This is a description";

  const TestAppHead = {
    components: { AppHead },
    template: `<AppHead :title="title" :description="description" />`,
    data() {
      return {
        title,
        description,
      };
    },
  };

  render(TestAppHead);

  await waitFor(() => expect(document.title).toEqual(title + titleSuffix));

  const metaDescription = document.querySelector("meta[name='description']");

  expect(metaDescription?.getAttribute("content")).toEqual(description);
});
