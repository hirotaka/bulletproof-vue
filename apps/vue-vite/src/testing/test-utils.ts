/* eslint-disable @typescript-eslint/no-explicit-any */
import { render as rtlRender } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import { createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'

import {
  createUser as generateUser,
  createDiscussion as generateDiscussion,
} from './data-generators'
import { db } from './mocks/db'
import { AUTH_COOKIE, authenticate, hash } from './mocks/utils'

export const createUser = async (userProperties?: any) => {
  const user = generateUser(userProperties) as any
  await db.user.create({ ...user, password: hash(user.password) })
  return user
}

export const createDiscussion = async (discussionProperties?: any) => {
  const discussion = generateDiscussion(discussionProperties)
  const res = await db.discussion.create(discussion)
  return res
}

export const loginAsUser = async (user: any) => {
  const authUser = await authenticate(user)
  Cookies.set(AUTH_COOKIE, authUser.jwt)
  return authUser
}

export const waitForLoadingToFinish = async () => {
  const { screen } = await import('@testing-library/vue')
  const { waitForElementToBeRemoved } = await import('@testing-library/vue')

  return waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 },
  )
}

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    const newUser = await createUser()
    return loginAsUser(newUser)
  } else if (user) {
    return loginAsUser(user)
  } else {
    return null
  }
}

export const renderApp = async (
  ui: Component,
  { user, url = '/', path = '/', ...renderOptions }: Record<string, any> = {},
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  const initializedUser = await initializeUser(user)

  const routes: RouteRecordRaw[] = [
    {
      path: path,
      component: ui,
    },
  ]

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  if (url) {
    await router.push(url)
  }

  const returnValue = {
    ...rtlRender(ui, {
      global: {
        plugins: [router],
      },
      ...renderOptions,
    }),
    user: initializedUser,
  }

  await waitForLoadingToFinish()

  return returnValue
}

export * from '@testing-library/vue'
export { userEvent, rtlRender }
