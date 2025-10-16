<script lang="ts">
import type { ZodSchema } from 'zod'

export interface FormProps {
  schema: ZodSchema
  initialValues?: Record<string, unknown>
  class?: string
}
</script>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { computed } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<FormProps>()
const emit = defineEmits<{
  submit: [values: Record<string, unknown>]
}>()

const validationSchema = computed(() => toTypedSchema(props.schema))

const { handleSubmit, errors, isSubmitting, resetForm } = useForm({
  validationSchema: validationSchema.value,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit((values: Record<string, unknown>) => {
  emit('submit', values)
})

defineExpose({
  resetForm,
  errors,
})
</script>

<template>
  <form @submit="onSubmit" :class="cn('space-y-6', $props.class)" v-bind="$attrs">
    <slot :errors="errors" :is-submitting="isSubmitting"></slot>
  </form>
</template>
