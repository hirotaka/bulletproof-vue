<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

import FieldWrapper from "@/components/Form/FieldWrapper.vue";

interface TextareaFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  value?: string;
}

// TODO: Maybe, should use vite-plugin-vue-type-imports
//  https://github.com/wheatjs/vite-plugin-vue-type-imports
const props = defineProps<TextareaFieldProps>();

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <FieldWrapper :label="label" :errorMessage="errorMessage">
    <textarea
      :name="name"
      :id="name"
      :value="inputValue"
      @input="handleChange"
      @blur="handleBlur"
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
    </textarea>
  </FieldWrapper>
</template>
