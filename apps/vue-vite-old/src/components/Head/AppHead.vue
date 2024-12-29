<script setup lang="ts">
import { Head } from "@vueuse/head";

type HeadProps = {
  title?: string;
  description?: string;
};

defineProps<HeadProps>();

const defaultTitle = "Bulletproof Vue";
</script>

<template>
  <Head>
    <title>{{ title ? `${title} | ${defaultTitle}` : defaultTitle }}</title>
    <meta name="description" :content="description" />
  </Head>
</template>
