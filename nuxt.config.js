export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Secret Santa 2020',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A site for the Whites, Karlovics, & Harrisons to pick their secret santas',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  server: {
    port: 3542,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    'bootstrap-vue/nuxt',
    '@nuxt/http',
    '@nuxtjs/google-analytics',
  ],

  serverMiddleware: {
    '/api': '~/api',
  },

  http: {
    baseUrl: 'https://secretsanta.aharrison.xyz',
    https: true,
  },

  googleAnalytics: {
    id: 'G-TTEP0V2KKE',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
