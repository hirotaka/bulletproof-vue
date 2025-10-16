<script setup lang="ts">
import { useNotificationStore } from '@/stores/notifications';
import Notification from './notification.vue';

const store = useNotificationStore();
</script>

<template>
  <div
    aria-live="assertive"
    class="z-50 flex flex-col fixed inset-0 space-y-4 items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <Notification
      v-for="notification in store.notifications"
      :key="notification.id"
      :notification="notification"
      @dismiss="store.dismiss(notification.id)"
    />
  </div>
</template>
