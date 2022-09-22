import { render, waitFor } from "@/test/test-utils";
import { createHead } from "@vueuse/head";

import AppHead from "../AppHead.vue";

test("should add proper page title and meta description", async () => {
  const title = "Hello World";
  const titleSuffix = " | Bulletproof Vue";
  const description = "This is a description";

  const head = createHead();

  render(AppHead, {
    props: {
      title,
      description,
    },
    global: {
      plugins: [head],
    },
  });

  await waitFor(() => expect(document.title).toEqual(title + titleSuffix));

  const metaDescription = document.querySelector("meta[name='description']");

  expect(metaDescription?.getAttribute("content")).toEqual(description);
});
