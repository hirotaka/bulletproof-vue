import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { User, Comment, Discussion } from '@/types/api'

// Role definition types
export type Role = 'ADMIN' | 'USER'

// Policy definition types
export type Policy = {
  'comment:delete': (user: User, comment: Comment) => boolean
  'discussion:delete': (user: User, discussion: Discussion) => boolean
  'user:delete': (user: User, targetUser: User) => boolean
}

// Policy implementations
export const POLICIES: Policy = {
  'comment:delete': (user, comment) => {
    // Admins can delete any comment
    if (user.role === 'ADMIN') {
      return true
    }
    // Users can only delete their own comments
    return user.id === comment.author.id
  },

  'discussion:delete': (user, discussion) => {
    // Admins can delete any discussion
    if (user.role === 'ADMIN') {
      return true
    }
    // Users can only delete their own discussions
    return user.id === discussion.author.id
  },

  'user:delete': (user, targetUser) => {
    // Only admins can delete users
    if (user.role !== 'ADMIN') {
      return false
    }
    // Admins cannot delete themselves
    return user.id !== targetUser.id
  },
}

// Authorization composable
export function useAuthorization() {
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)

  /**
   * Check if the current user has access based on a policy
   * @param policyCheck - The policy key to check
   * @param data - Optional data required by the policy
   * @returns boolean indicating if user has access
   */
  function checkAccess<TPolicy extends keyof Policy>(
    policyCheck: TPolicy,
    data?: Parameters<Policy[TPolicy]>[1],
  ): boolean {
    if (!user.value) {
      return false
    }

    const policy = POLICIES[policyCheck]
    if (!policy) {
      console.warn(`Policy "${policyCheck}" not found`)
      return false
    }

    if (data) {
      return policy(user.value, data as never)
    }

    return false
  }

  /**
   * Check if the current user has a specific role
   * @param roles - Single role or array of roles to check
   * @returns boolean indicating if user has the role
   */
  function hasRole(roles: Role | Role[]): boolean {
    if (!user.value) {
      return false
    }

    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.value.role)
  }

  return {
    checkAccess,
    hasRole,
    user,
  }
}
