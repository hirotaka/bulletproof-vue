import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupProviders } from './app/provider'
import { enableMocking } from './testing/mocks'

import VueDOMPurifyHTML from 'vue-dompurify-html'

enableMocking().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(VueDOMPurifyHTML)

  // Setup Vue Query and other providers
  setupProviders(app)

  app.mount('#app')
})
