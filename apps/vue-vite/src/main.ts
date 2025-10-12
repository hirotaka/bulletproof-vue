import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupProviders } from './app/provider'

import VueDOMPurifyHTML from 'vue-dompurify-html'

const enableMocking = async () => {
  if (import.meta.env.VITE_APP_ENABLE_API_MOCKING !== 'true') {
    return
  }

  try {
    const { worker } = await import('./testing/mocks/browser')
    return worker.start()
  } catch (error) {
    console.warn('Failed to start MSW worker:', error)
    return
  }
}

enableMocking().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(VueDOMPurifyHTML)

  // Setup Vue Query and other providers
  setupProviders(app)

  app.mount('#app')
})
