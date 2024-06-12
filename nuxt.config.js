export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sapawarga CMS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    script: [
      {
        src: '/newrelic-browser-script.js',
        'data-account-id': `${process.env.ACCOUNT_ID_NEW_RELIC}`,
        'data-browser-license-key': `${process.env.LICENSE_KEY_NEW_RELIC_ACCOUNT}`,
        'data-application-id': `${process.env.APPLICATION_ID_NEW_RELIC}`,
      },
      {
        src: '/xlsx-script.js',
        async: true,
      },
      {
        src: 'https://public.tableau.com/javascripts/api/tableau-2.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/jds-design-system.js' },
    // plugin axios
    '~/plugins/axios',
    '~/plugins/vue-gtag.js',
    '~/plugins/vee-validate.js',
    '~/plugins/date-picker.js',
    '~/plugins/unleash.client.js',
    '~/plugins/mockup-api.js',
    '~/plugins/vue-countdown.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/svg',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // auth
    '@nuxtjs/auth-next',
  ],

  auth: {
    redirect: {
      callback: '/callback',
    },
    strategies: {
      keyclock: {
        scheme: 'openIDConnect',
        clientId: process.env.KEYCLOCK_CLIENT_ID,
        endpoints: {
          configuration: process.env.KEYCLOCK_ENDPOINT,
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 600,
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 2592000,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'offline_access'],
        codeChallengeMethod: 'S256',
      },
    },
    plugins: ['~/plugins/get-roles.js'],
  },

  router: {
    middleware: ['auth', 'guardRoutes'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'preview-pdf',
        path: '/preview-pdf/tahura/:assurance/:category/:startDate/:endDate/:status/:token',
        component: resolve(
          __dirname,
          '~/pages/tahura/preview-pdf/_assurance-category-startDate-endDate-status-token.vue'
        ),
      })
    },
  },

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Lato: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Lora: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
    overwriting: true,
  },

  // Private runtime config
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL + '/' + process.env.VERSION_ENDPOINT,
    },
  },

  // Public runtime config
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    keyclockBaseUrl: process.env.KEYCLOCK_BASE_URL,
    urlMainService: process.env.URL_MAIN_SERVICE,
    axios: {
      browserBaseURL:
        process.env.BROWSER_BASE_URL + '/' + process.env.VERSION_ENDPOINT,
    },
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    expiredForgotPasswordLink: process.env.EXPIRY_FORGOT_PASSWORD_LINK,
    expiredInvitationLink: process.env.EXPIRY_INVITATION_LINK,
    tinymceApiKey: process.env.TINYMCE_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    urlMockApi: process.env.URL_MOCKAPI + '/' + process.env.VERSION_ENDPOINT,
    urlTableauJabarProv: process.env.URL_TABLEAU_JABARPROV,
    urlDashboardTahura: process.env.URL_DASHBOARD_TAHURA,
    usernameTableau: process.env.USERNAME_TABLEAU,
    urlGetTokenTableau: process.env.URL_GET_TOKEN_TABLEAU,
    unleash: {
      unleashURL: process.env.UNLEASH_URL,
      unleashToken: process.env.UNLEASH_TOKEN,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@jabardigitalservice/jds-design-system',
      'vee-validate/dist/rules',
    ],
  },
}
