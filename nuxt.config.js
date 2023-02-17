export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sapawarga CMS',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/jds-design-system.js' },
    // plugin axios
    '~/plugins/axios',
    '~/plugins/vue-gtag.js'
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
    '@nuxtjs/svg'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // auth
    '@nuxtjs/auth-next'
  ],

  newrelic: {
    apm: {
      enabled: true,
      app_name: process.env.NEW_RELIC_APP_NAME,
      license_key: process.env.NEW_RELIC_LICENSE_KEY
      // additional agent config can be added here
    },
    browser: {
      enabled: true,
      scriptId: 'newrelic',
      accountId: process.env.ACCOUNT_ID_NEW_RELIC,
      agentId: process.env.APPLICATION_ID_NEW_RELIC,
      licenseKey: process.env.LICENSE_KEY_NEW_RELIC_ACCOUNT,
      applicationId: process.env.APPLICATION_ID_NEW_RELIC
    }
  },

  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      keyclock: {
        scheme: 'openIDConnect',
        clientId: process.env.KEYCLOCK_CLIENT_ID,
        endpoints: {
          configuration: process.env.KEYCLOCK_ENDPOINT
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 600
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 2592000
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'offline_access'],
        codeChallengeMethod: 'S256'
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  googleFonts: {
    display: 'swap',
    families: {
      Roboto: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
      Lato: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
      Lora: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    },
    overwriting: true
  },

  // Private runtime config
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL + '/' + process.env.VERSION_ENDPOINT
    }
  },

  // Public runtime config
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    keyclockBaseUrl: process.env.KEYCLOCK_BASE_URL,
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL + '/' + process.env.VERSION_ENDPOINT
    },
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@jabardigitalservice/jds-design-system'
    ]
  }
}
