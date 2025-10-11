<script setup lang="ts">
import { computed } from 'vue'
import { useAuthorization, type Role, type Policy } from '@/lib/authorization'

interface AuthorizationProps {
  policyCheck?: keyof Policy
  allowedRoles?: Role | Role[]
  data?: any
}

const props = defineProps<AuthorizationProps>()

const { checkAccess, hasRole } = useAuthorization()

const canAccess = computed(() => {
  // If both policyCheck and allowedRoles are provided, both must pass
  if (props.policyCheck && props.allowedRoles) {
    return checkAccess(props.policyCheck, props.data) && hasRole(props.allowedRoles)
  }

  // If only policyCheck is provided
  if (props.policyCheck) {
    return checkAccess(props.policyCheck, props.data)
  }

  // If only allowedRoles is provided
  if (props.allowedRoles) {
    return hasRole(props.allowedRoles)
  }

  // If neither is provided, deny access by default
  return false
})
</script>

<template>
  <template v-if="canAccess">
    <slot />
  </template>
  <template v-else>
    <slot name="forbiddenFallback" />
  </template>
</template>
