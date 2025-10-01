// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'https://babycity-backend.solisgentech.in/api/v1/'
      // apiBase: 'http://baby-city-backend.localhost/api/v1/'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['nuxt-toast']
})
