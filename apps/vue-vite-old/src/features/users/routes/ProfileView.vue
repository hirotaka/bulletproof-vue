<script setup lang="ts">
import { ContentLayout } from "@/components/Layout";

import ProfileEntry from "../components/ProfileEntry.vue";
import UpdateProfile from "../components/UpdateProfile.vue";

import { useAuth } from "@/composables/useAuth";

const { user } = useAuth();
</script>

<template>
  <ContentLayout v-if="user" title="Profile">
    <div class="mt-4">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <div class="flex justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              User Information
            </h3>
            <UpdateProfile />
          </div>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details of the user.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <ProfileEntry label="First Name" :value="user.firstName" />
            <ProfileEntry label="Last Name" :value="user.lastName" />
            <ProfileEntry label="Email Address" :value="user.email" />
            <ProfileEntry label="Role" :value="user.role" />
            <ProfileEntry label="Bio" :value="user.bio" />
          </dl>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
