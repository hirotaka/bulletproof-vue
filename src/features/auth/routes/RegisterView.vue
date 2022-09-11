<script setup lang="ts">
import { useRouter } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import RegisterForm from "../components/RegisterForm.vue";

const router = useRouter();

const onSuccess = () => {
  router.push({ path: "/app" });
};
</script>

<template>
  <AuthLayout title="Register your account">
    <RegisterForm :onSuccess="onSuccess" />
  </AuthLayout>
</template>
