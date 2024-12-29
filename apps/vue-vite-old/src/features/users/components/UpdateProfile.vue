<script setup lang="ts">
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { PencilIcon } from "@heroicons/vue/20/solid";

import { BaseButton } from "@/components/Elements";
import {
  BaseForm,
  FormDrawer,
  InputField,
  TextareaField,
} from "@/components/Form";

import { useAuth } from "@/composables/useAuth";
import { useUpdateProfile } from "../api/updateProfile";

const validationSchema = toFormValidator(
  z.object({
    email: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    bio: z.string().min(1, "Required"),
  })
);

const { user } = useAuth();
const { isLoading, isSuccess, mutateAsync } = useUpdateProfile();

async function onSubmit(values) {
  await mutateAsync({ data: values });
}
</script>

<template>
  <FormDrawer title="Update Profile" :isDone="isSuccess">
    <template #triggerButton>
      <BaseButton size="sm">
        <template #startIcon>
          <PencilIcon class="h-4 w-4" />
        </template>
        Update Profile
      </BaseButton>
    </template>
    <template #submitButton>
      <BaseButton
        type="submit"
        form="update-profile"
        size="sm"
        :isLoading="isLoading"
      >
        Submit
      </BaseButton>
    </template>
    <BaseForm
      id="update-profile"
      @submit="onSubmit"
      :validation-schema="validationSchema"
    >
      <InputField
        name="firstName"
        label="First Name"
        :value="user?.firstName"
        type="text"
      />
      <InputField
        name="lastName"
        label="Last Name"
        :value="user?.lastName"
        type="text"
      />
      <InputField
        name="email"
        label="Email Address"
        :value="user?.email"
        type="email"
      />
      <TextareaField name="bio" label="Bio" :value="user?.bio" />
    </BaseForm>
  </FormDrawer>
</template>
