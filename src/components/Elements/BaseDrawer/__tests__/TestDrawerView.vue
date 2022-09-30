<script setup lang="ts">
import BaseDrawer from "../BaseDrawer.vue";
import { BaseButton } from "../../BaseButton";

import { useDisclosure } from "@/composables/useDisclosure";

const { close, open, isOpen } = useDisclosure();

type TestDrawerProps = {
  openButtonText: string;
  titleText: string;
  cancelButtonText: string;
  drawerContentText: string;
};

defineProps<TestDrawerProps>();
</script>

<template>
  <BaseButton @click="open">{{ openButtonText }}</BaseButton>
  <BaseDrawer :isOpen="isOpen" @close="close" :title="titleText" size="md">
    <template #footer>
      <BaseButton variant="inverse" size="sm" @click="close">
        {{ cancelButtonText }}
      </BaseButton>
    </template>
    {{ drawerContentText }}
  </BaseDrawer>
</template>
