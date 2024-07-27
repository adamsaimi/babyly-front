import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import { routes } from 'vue-router/auto-routes'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import type { UserModule } from './types'
import '@unocss/reset/tailwind.css'
import './assets/index.css'
import 'primeicons/primeicons.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
    ctx.app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode-switch',
        },
      },
    })

    ctx.app.directive('tooltip', Tooltip)

    console.warn = () => {}
  },
)
