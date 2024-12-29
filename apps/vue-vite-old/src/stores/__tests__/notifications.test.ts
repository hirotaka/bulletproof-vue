import { setActivePinia, createPinia } from "pinia";
import { useNotificationStore } from "../notifications";
import type { Notification } from "../notifications";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("should add and remove notifications", () => {
  const store = useNotificationStore();

  expect(store.notifications.length).toBe(0);

  const notification: Notification = {
    id: "123",
    title: "Hello World",
    type: "info",
    message: "This is a notification",
  };

  store.add(notification);

  expect(store.notifications).toContainEqual(notification);

  store.dismiss(notification.id);

  expect(store.notifications).not.toContainEqual(notification);
});
