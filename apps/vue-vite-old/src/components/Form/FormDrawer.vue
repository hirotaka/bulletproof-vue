<script lang="ts">
import { cloneVNode, useSlots, watchEffect } from "vue";
import { useDisclosure } from "@/composables/useDisclosure";
import {
  BaseButton,
  BaseDrawer,
  type BaseDrawerProps,
} from "@/components/Elements";
</script>

<script setup lang="ts">
const { close, open, isOpen } = useDisclosure();
const slots = useSlots();

type FormDrawerProps = {
  title: string;
  size?: BaseDrawerProps["size"];
  isDone: boolean;
};

const props = withDefaults(defineProps<FormDrawerProps>(), {
  size: "md",
});

const elements = slots.triggerButton ? slots.triggerButton() : [];

const triggerButton = cloneVNode(elements[0], {
  onClick: () => open(),
});

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
