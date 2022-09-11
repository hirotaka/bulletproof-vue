<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { toFormValidator } from "@vee-validate/zod";
import { z } from "zod";

import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField, SelectField } from "@/components/Form";

import { useTeams } from "@/features/teams";
import { useAuth } from "@/composables/useAuth";

type RegisterFormProps = {
  onSuccess: () => void;
};

const props = defineProps<RegisterFormProps>();
const chooseTeam = ref(false);

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

const validationSchema = computed(() => {
  return toFormValidator(
    chooseTeam.value
      ? schema.and(z.object({ teamId: z.string().min(1, "Required") }))
      : schema.and(z.object({ teamName: z.string().min(1, "Required") }))
  );
});

const { register, isRegistering } = useAuth();
const { data: teams } = useTeams({
  config: {
    enabled: chooseTeam,
  },
});

async function onSubmit(values) {
  await register(values);
  props.onSuccess();
}
</script>

<template>
  <div>
    <BaseForm @submit="onSubmit" :validation-schema="validationSchema">
      <InputField name="firstName" type="text" label="First Name" />
      <InputField name="lastName" type="text" label="Last Name" />
      <InputField name="email" type="email" label="Email Address" />
      <InputField name="password" type="password" label="Password" />
      <SwitchGroup>
        <div className="flex items-center">
          <Switch
            v-model="chooseTeam"
            :class="chooseTeam ? 'bg-blue-600' : 'bg-gray-200'"
            class="bg-blue-600 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span
              :class="chooseTeam ? 'translate-x-6' : 'translate-x-1'"
              class="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
            />
          </Switch>
          <SwitchLabel class="ml-4">Join Existing Team</SwitchLabel>
        </div>
      </SwitchGroup>
      <SelectField
        v-if="chooseTeam && teams"
        name="teamId"
        label="Team"
        :options="teams.map((team) => ({ label: team.name, value: team.id }))"
      />
      <InputField v-else name="teamName" type="text" label="Team Name" />
      <div>
        <BaseButton type="submit" :isLoading="isRegistering" class="w-full">
          Register
        </BaseButton>
      </div>
    </BaseForm>
    <div class="mt-2 flex items-center justify-end">
      <div class="text-sm">
        <RouterLink
          to="/auth/login"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          Log In
        </RouterLink>
      </div>
    </div>
  </div>
</template>
