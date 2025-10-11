<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from 'radix-vue'
import { useField } from 'vee-validate'
import { computed } from 'vue'
import { cn } from '@/utils/cn'
import { CheckIcon } from '@radix-icons/vue'
import Label from '../form/label.vue'

interface CheckboxProps {
  name: string
  label?: string
  disabled?: boolean
  class?: string
  id?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
})

// Integrate with VeeValidate
const { value: checked, errorMessage } = useField<boolean>(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false,
})

const checkboxId = computed(() => props.id || props.name)

const checkboxClass = computed(() =>
  cn(
    'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    props.class,
  ),
)
</script>

<template>
  <div class="flex items-center space-x-2">
    <CheckboxRoot
      :id="checkboxId"
      v-model:checked="checked"
      :disabled="disabled"
      :class="checkboxClass"
    >
      <CheckboxIndicator class="flex items-center justify-center text-current">
        <CheckIcon class="h-4 w-4" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <Label v-if="label" :for="checkboxId" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {{ label }}
    </Label>
  </div>
  <div v-if="errorMessage" class="text-sm text-destructive mt-1">
    {{ errorMessage }}
  </div>
</template>
