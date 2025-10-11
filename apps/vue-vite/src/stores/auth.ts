import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/api'

const STORAGE_KEY = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)

  // Computed
  const isAuthenticated = computed(() => user.value !== null)

  // Actions
  function setUser(newUser: User | null) {
    user.value = newUser
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function clearUser() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  // Initialize from localStorage
  function initAuth() {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY)
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    } catch (error) {
      console.error('Failed to parse stored user:', error)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Initialize on store creation
  initAuth()

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
  }
})
