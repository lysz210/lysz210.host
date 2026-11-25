// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
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

  i18n: {
    langDir: 'lang',
    customRoutes: 'page',
    locales: [
      { code: 'en', name: 'English', file: 'en.yaml'},
      { code: 'it', name: 'Italiano', file: 'it.yaml'}
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    compilation: {
      strictMessage: false
    },
    vueI18n: 'vue-i18n.config.ts'
  },

})