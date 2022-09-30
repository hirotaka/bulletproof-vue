<script setup lang="ts">
import { useRouter } from "vue-router";

import AuthLayout from "../components/AuthLayout.vue";
import LoginForm from "../components/LoginForm.vue";

const router = useRouter();

const onSuccess = () => {
  router.push({ path: "/app" });
};
</script>

<template>
  <AuthLayout title="Log in to your account">
    <LoginForm @success="onSuccess" />
  </AuthLayout>
</template>
