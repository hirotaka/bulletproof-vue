<script setup lang="ts">
import { ContentLayout } from "@/components/Layout";
import { useAuth } from "@/composables/useAuth";
import { ROLES } from "@/composables/useAuthorization";

const { user } = useAuth();
</script>

<template>
  <ContentLayout title="Dashboard">
    <h1 class="text-xl mt-2">
      Welcome <b>{{ user?.firstName }} {{ user?.lastName }}</b>
    </h1>
    <h4 class="my-3">
      Your role is : <b>{{ user?.role }}</b>
    </h4>
    <p class="font-medium">In this application you can:</p>
    <ul v-if="user?.role === ROLES.USER" class="my-4 list-inside list-disc">
      <li>Create comments in discussions</li>
      <li>Delete own comments</li>
    </ul>
    <ul v-if="user?.role === ROLES.ADMIN" class="my-4 list-inside list-disc">
      <li>Create discussions</li>
      <li>Edit discussions</li>
      <li>Delete discussions</li>
      <li>Comment on discussions</li>
      <li>Delete all comments</li>
    </ul>
  </ContentLayout>
</template>
