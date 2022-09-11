<script setup lang="tsx">
import { formatDate } from "@/utils/format";

import { BaseLink, BaseSpinner, BaseTable } from "@/components/Elements";
import DeleteDiscussion from "./DeleteDiscussion.vue";

import { useDiscussions } from "../api/getDiscussions";

const { data, isLoading } = useDiscussions();

const columns = [
  {
    title: "Title",
    field: "title",
  },
  {
    title: "Created At",
    field: "createdAt",
    Cell({ entry: { createdAt } }) {
      return <span>{formatDate(createdAt)}</span>;
    },
  },
  {
    title: "",
    fieled: "id",
    Cell({ entry: { id } }) {
      return <BaseLink to={`/app/discussions/${id}`}>View</BaseLink>;
    },
  },
  {
    title: "",
    field: "id",
    Cell({ entry: { id } }) {
      return id ? <DeleteDiscussion id={id} /> : null;
    },
  },
];
</script>

<template>
  <div v-if="isLoading" class="w-full h-48 flex justify-center items-center">
    <BaseSpinner size="lg" />
  </div>
  <BaseTable v-if="data" :data="data" :columns="columns" />
</template>
