import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { z } from 'zod'

import type { AuthResponse, User } from '@/types/api'
import { useAuthStore } from '@/stores/auth'

import { api } from './api-client'

// API call definitions for auth (types, schemas, requests)
// These are not part of features as this is a module shared across features

// Get current user
const getUser = async (): Promise<User> => {
  return api.get('/auth/me')
}

// Logout
const logout = (): Promise<void> => {
  return api.post('/auth/logout')
}

// Login schema and type
export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
})

export type LoginInput = z.infer<typeof loginInputSchema>

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data)
}

// Register schema and type
export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(5, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  )

export type RegisterInput = z.infer<typeof registerInputSchema>

const registerWithEmailAndPassword = (data: RegisterInput): Promise<AuthResponse> => {
  return api.post('/auth/register', data)
}

// useAuth composable - Main authentication hook
export const useAuth = () => {
  const queryClient = useQueryClient()
  const authStore = useAuthStore()

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await loginWithEmailAndPassword(data)
      return response.user
    },
    onSuccess: (user) => {
      authStore.setUser(user)
      queryClient.setQueryData(['auth-user'], user)
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await registerWithEmailAndPassword(data)
      return response.user
    },
    onSuccess: (user) => {
      authStore.setUser(user)
      queryClient.setQueryData(['auth-user'], user)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authStore.clearUser()
      queryClient.clear()
    },
  })

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}

// useUser composable - Get current user with query
export const useUser = () => {
  const authStore = useAuthStore()

  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
    enabled: authStore.isAuthenticated,
    staleTime: Infinity, // User data doesn't go stale
    retry: false, // Don't retry on failure
    onSuccess: (data) => {
      authStore.setUser(data)
    },
    onError: () => {
      authStore.clearUser()
    },
  })
}
