<script setup lang="ts">
import { ContentLayout } from "@/components/Layout";

import DiscussionsList from "../components/DiscussionsList.vue";
import CreateDiscussion from "../components/CreateDiscussion.vue";
</script>

<template>
  <ContentLayout title="Discussions">
    <div className="flex justify-end">
      <CreateDiscussion />
    </div>
    <div class="mt-4">
      <DiscussionsList />
    </div>
  </ContentLayout>
</template>
