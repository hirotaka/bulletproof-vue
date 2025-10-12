<script setup lang="ts">
import { computed } from 'vue';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { TransitionRoot } from '@headlessui/vue';

type NotificationProps = {
  notification: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message?: string;
  };
};

interface Emits {
  (e: 'dismiss'): void;
}

const props = defineProps<NotificationProps>();
const emit = defineEmits<Emits>();

const iconComponent = computed(() => {
  const iconMap = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon,
    error: XCircleIcon,
  };
  return iconMap[props.notification.type];
});

const iconColorClass = computed(() => {
  const colorMap = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };
  return colorMap[props.notification.type];
});

const onDismiss = () => {
  emit('dismiss');
};
</script>

<template>
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    <TransitionRoot
      :show="true"
      as="template"
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4" role="alert" :aria-label="notification.title">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="iconComponent" :class="['h-6 w-6', iconColorClass]" aria-hidden="true" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.title }}
              </p>
              <p v-if="notification.message" class="mt-1 text-sm text-gray-500">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="onDismiss"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>
