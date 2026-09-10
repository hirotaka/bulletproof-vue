---
title: Handle API Error Notifications in Custom Fetchers
semanticId: api-error-notifications
category: failure-and-workflow-outcomes
prerequisites: [custom-api-fetchers]
status: confirmed
---

# Handle API Error Notifications in Custom Fetchers

## Practice

Define common API error notifications in the error hooks of custom fetchers. Requests made through those fetchers then use the same notification rules, without repeating notification handling in each component or composable that makes an API request.

## Apply When

- API request failures across multiple pages or user operations should appear through the same notification UI.
- Requests need shared rules for error messages and intentional cancellation, with per-request message overrides or notification suppression where needed.
- Errors from SSR-capable custom `useFetch` requests need to be shown after hydration.

## Do Not Apply When

- The feedback belongs to form validation, such as a message beside an invalid field.
- A page or user operation needs its own error explanation or recovery instructions instead of a common notification.

## Why

When each component or composable handles API error notifications separately, the same failure can produce different messages, or notification handling may be omitted. Defining common handling in custom fetchers gives requests made through them consistent failure feedback and lets shared notification rules change without updating each component or composable.

## Implementation Guidance

- Define a shared function that builds notification content from a request error or an API error response. Let a request override that content or suppress the notification, and return no notification for an intentional cancellation.
- Call the shared function from the custom fetchers' `onRequestError` and `onResponseError` hooks. Pass `error` from `onRequestError` and `response._data` from `onResponseError`.
- If an individual request provides its own error hook, run the common notification hook and the request-specific hook instead of replacing either one.
- Store notifications in shared state and render them in a notification component. For an SSR-capable custom `useFetch` composable, use Nuxt's `useState` when notifications created during server rendering need to remain available after hydration.

## Minimal Nuxt Example

The app-specific `useNotifications`, `isIntentionalCancellation`, and `getApiErrorMessage` helpers in this example store notifications, recognize canceled requests, and select a message.

```ts
const reportError = (error: unknown) => {
  if (isIntentionalCancellation(error)) return;

  useNotifications().addNotification({
    type: "error",
    title: "Request failed",
    message: getApiErrorMessage(error),
  });
};

export const useApi = createUseFetch((options) => ({
  onRequestError: [
    ({ error }) => reportError(error),
    ...toArray(options.onRequestError),
  ],
  onResponseError: [
    ({ response }) => reportError(response._data),
    ...toArray(options.onResponseError),
  ],
}));

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
```

Requests made with `useApi` use the common notification hook before any error hook provided for an individual request.

## App Examples

- [`useAPI.ts`](../../../apps/bulletproof-nuxt/layers/base/app/composables/useAPI.ts) defines the custom `useFetch` composable used for page data and reports its request failures.
- [`api.ts`](../../../apps/bulletproof-nuxt/layers/base/app/plugins/api.ts) creates a custom `$fetch` instance used for browser operations and reports its request failures.
- [`apiNotifications.ts`](../../../apps/bulletproof-nuxt/layers/base/app/utils/apiNotifications.ts) selects default or request-specific notification content and suppresses notifications for canceled requests.
- [`useNotifications.ts`](../../../apps/bulletproof-nuxt/layers/base/app/composables/useNotifications.ts) stores notifications in Nuxt state.
- [`app.vue`](../../../apps/bulletproof-nuxt/app/app.vue) mounts the notification center at the app root.
- [`NotificationCenter.vue`](../../../apps/bulletproof-nuxt/app/components/app/NotificationCenter.vue) renders stored notifications in the browser.

## Trade-offs and Limitations

Error hooks run for each failed request attempt. If a custom fetcher retries a request and the later attempt succeeds, the user may already have seen a failure notification. Coordinating notifications with the final retry outcome requires additional retry-aware behavior outside this Practice.

Common notification rules affect every request made through the custom fetcher. Use a per-request override or suppression when a page or user operation needs different feedback.

A custom fetcher that runs only in the browser does not need Nuxt state solely to carry notifications through hydration.

## Sources

- [Nuxt custom `useFetch`](https://nuxt.com/docs/4.x/guide/recipes/custom-usefetch)
- [Nuxt `createUseFetch`](https://nuxt.com/docs/4.x/api/composables/create-use-fetch)
- [Nuxt `useState`](https://nuxt.com/docs/4.x/api/composables/use-state)
- [ofetch interceptors](https://github.com/unjs/ofetch#interceptors)

## Related Practices

- [Use Custom Fetchers for Your API](custom-api-fetchers.md)
- [Use Imperative API Requests for Application Operations](imperative-api-requests.md)
- [Separate Completed Changes from Data Refresh Failures](completed-change-refresh-failures.md)
