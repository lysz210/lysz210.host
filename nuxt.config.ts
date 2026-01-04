// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@pinia/nuxt',
  ],
  nitro: {
    prerender: {
      routes: ['/it', '/en']
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  ssr: false,
  app: {
      head: {
          title: 'Lysz210'
      }
  },

  runtimeConfig: {
      public: {
          cvBasePath: 'https://cv.lysz210.me',
          cvPdf: '/CV_lingyong_sun.pdf',
          meSocialAccounts: '/me/social-accounts'
      }
  },

})