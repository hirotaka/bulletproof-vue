<script setup lang="ts">
import { computed } from "vue";
import createDOMPurify from "dompurify";
import { marked } from "marked";

export interface MDPreviewProps {
  value: string;
}

const props = defineProps<MDPreviewProps>();

const sanitizedHtml = computed(() => {
  const html = marked.parse(props.value);
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(html);
});
</script>

<template>
  <div class="p-2 w-full prose prose-indigo" v-html="sanitizedHtml"></div>
</template>
