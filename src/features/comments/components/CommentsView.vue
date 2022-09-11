<script setup lang="ts">
import CreateComment from "./CreateComment.vue";
import CommentsList from "./CommentsList.vue";

type CommentsProps = {
  discussionId: string;
};

defineProps<CommentsProps>();
</script>

<template>
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-1xl font-bold">Comments:</h3>
      <CreateComment :discussionId="discussionId" />
    </div>
    <CommentsList :discussionId="discussionId" />
  </div>
</template>
