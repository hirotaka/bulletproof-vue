<script setup lang="ts">
import { RouterLink } from "vue-router";

import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField } from "@/components/Form";

import { useAuth } from "@/composables/useAuth";

const validationSchema = toFormValidator(
  z.object({
    email: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
);

const { login, isLoggingIn } = useAuth();

type LoginFormEmits = {
  (e: "success"): void;
};

const emits = defineEmits<LoginFormEmits>();

async function onSubmit(values) {
  await login(values);
  emits("success");
}
</script>

<template>
  <BaseForm @submit="onSubmit" :validation-schema="validationSchema">
    <InputField name="email" type="email" label="Email Address" />
    <InputField name="password" type="password" label="Password" />
    <div>
      <BaseButton type="submit" class="w-full" :isLoading="isLoggingIn"
        >Log in</BaseButton
      >
    </div>
  </BaseForm>
  <div class="mt-2 flex items-center justify-end">
    <div class="text-sm">
      <!--
      <RouterLink
        to="/auth/register"
        class="font-medium text-blue-600 hover:text-blue-500"
      >
        Register
      </RouterLink>
      -->
    </div>
  </div>
</template>
