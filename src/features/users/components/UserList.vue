<script setup lang="tsx">
import { BaseSpinner, BaseTable } from "@/components/Elements";

import DeleteUser from "./DeleteUser.vue";

import { formatDate } from "@/utils/format";
import { useUsers } from "../api/getUsers";

const { data, isLoading } = useUsers();

const columns = [
  {
    title: "First Name",
    field: "firstName",
  },
  {
    title: "Last Name",
    field: "lastName",
  },
  {
    title: "Email",
    field: "email",
  },
  {
    title: "Role",
    field: "role",
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
    field: "id",
    Cell({ entry: { id } }) {
      return <DeleteUser id={id} />;
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
