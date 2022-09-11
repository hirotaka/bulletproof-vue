<script setup lang="ts">
import { ContentLayout } from "@/components/Layout";
import { AuthorizationProvider } from "@/providers";
import { ROLES } from "@/composables/useAuthorization";

import UsersList from "../components/UserList.vue";
</script>

<template>
  <ContentLayout title="Users">
    <div class="mt-4">
      <AuthorizationProvider :allowedRoles="[ROLES.ADMIN]">
        <template #forbiddenFallback>
          <div>Only admin can view this.</div>
        </template>
        <UsersList />
      </AuthorizationProvider>
    </div>
  </ContentLayout>
</template>
