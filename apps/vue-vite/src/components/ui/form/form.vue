<script lang="ts">
import type { ZodSchema } from 'zod'

export interface FormProps {
  schema: ZodSchema
  initialValues?: Record<string, any>
}
</script>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { computed } from 'vue'

const props = defineProps<FormProps>()
const emit = defineEmits<{
  submit: [values: Record<string, any>]
}>()

const validationSchema = computed(() => toTypedSchema(props.schema))

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: validationSchema.value,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

defineExpose({
  resetForm,
  errors,
})
</script>

<template>
  <form @submit="onSubmit">
    <slot :errors="errors" :is-submitting="isSubmitting"></slot>
  </form>
</template>
