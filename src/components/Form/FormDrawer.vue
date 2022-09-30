<script setup lang="ts">
import { cloneVNode, useSlots, watchEffect } from "vue";
import type { VNode } from "vue";
import { useDisclosure } from "@/composables/useDisclosure";
import { BaseButton, BaseDrawer } from "@/components/Elements";
import type { BaseDrawerProps } from "@/components/Elements";

interface FormDrawerProps {
  title: string;
  size?: BaseDrawerProps["size"];
  isDone: boolean;
}

const { close, open, isOpen } = useDisclosure();
const slots = useSlots();

const props = withDefaults(defineProps<FormDrawerProps>(), {
  size: "md",
});

let triggerButton: VNode;
const triggerVNodes = slots?.triggerButton;
if (triggerVNodes) {
  triggerButton = cloneVNode(triggerVNodes()[0], {
    onClick: () => open(),
  });
}

watchEffect(() => {
  if (props.isDone) {
    close();
  }
});
</script>

<template>
  <component :is="triggerButton" />
  <BaseDrawer :isOpen="isOpen" @close="close" :title="title" :size="size">
    <slot></slot>
    <template #footer>
      <BaseButton variant="inverse" size="sm" @click="close">
        Cancel
      </BaseButton>
      <slot name="submitButton"></slot>
    </template>
  </BaseDrawer>
</template>
