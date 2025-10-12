import type { Meta, StoryObj } from '@storybook/vue3';
import { useNotificationStore } from '@/stores/notifications';
import Notifications from './Notifications.vue';

const meta = {
  title: 'UI/Notifications/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="height: 500px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Notifications },
    setup() {
      const store = useNotificationStore();

      // Add some sample notifications
      store.add({
        type: 'info',
        title: 'Information',
        message: 'This is an informational notification',
      });

      store.add({
        type: 'success',
        title: 'Success',
        message: 'Your operation completed successfully',
      });

      return { store };
    },
    template: '<Notifications />',
  }),
};

export const MultipleNotifications: Story = {
  render: () => ({
    components: { Notifications },
    setup() {
      const store = useNotificationStore();

      // Add multiple notifications
      store.add({
        type: 'info',
        title: 'Info notification',
        message: 'This is informational',
      });

      store.add({
        type: 'success',
        title: 'Success notification',
        message: 'Operation succeeded',
      });

      store.add({
        type: 'warning',
        title: 'Warning notification',
        message: 'Please be careful',
      });

      store.add({
        type: 'error',
        title: 'Error notification',
        message: 'Something went wrong',
      });

      return { store };
    },
    template: '<Notifications />',
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { Notifications },
    setup() {
      const store = useNotificationStore();
      // Clear any notifications
      store.notifications = [];
      return { store };
    },
    template: '<Notifications />',
  }),
};
