<script setup lang="ts">
import { BaseButton } from "../../BaseButton";
import BaseDialog, { BaseDialogTitle } from "../BaseDialog.vue";

import { useDisclosure } from "@/composables/useDisclosure";

const { close, open, isOpen } = useDisclosure();

type TestDialogProps = {
  openButtonText: string;
  titleText: string;
  cancelButtonText: string;
};

defineProps<TestDialogProps>();
</script>

<template>
  <BaseButton @click="open">{{ openButtonText }}</BaseButton>
  <BaseDialog :isOpen="isOpen" @close="close">
    <div>
      <BaseDialogTitle as="h3">{{ titleText }}</BaseDialogTitle>
      <BaseButton type="button" @click="close">
        {{ cancelButtonText }}
      </BaseButton>
    </div>
  </BaseDialog>
</template>
