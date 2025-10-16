import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeEach } from 'vitest'

import { useNotificationStore, type Notification } from '../notifications'

// Unmock pinia for this test file
vi.unmock('pinia')

describe('Notification Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should add and remove notifications', () => {
    const store = useNotificationStore()

    expect(store.notifications.length).toBe(0)

    const notification: Omit<Notification, 'id'> = {
      title: 'Hello World',
      type: 'info',
      message: 'This is a notification',
    }

    store.add(notification)

    expect(store.notifications.length).toBe(1)
    expect(store.notifications[0]).toMatchObject(notification)
    expect(store.notifications[0].id).toBeDefined()

    const notificationId = store.notifications[0].id

    store.dismiss(notificationId)

    expect(store.notifications.length).toBe(0)
  })
})
