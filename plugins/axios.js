export default function ({ $axios, $config, app }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        'Api-Key': $config.apiKey
      }
    }
  })

  api.onRequest(async (config) => {
    if (app.$auth.loggedIn) {
      const token = app.$auth.strategy.token.get().split(' ')[1]
      api.setToken(token, 'Bearer')
      // HANDLE ACCESS TOKEN EXPIRED
      if (app.$auth.strategy.token.status().expired()) {
        const { token, refreshToken } = app.$auth.strategy
        await app.$auth.refreshTokens().then((response) => {
          token.set(response.data.access_token)
          refreshToken.set(response.data.refresh_token)
          api.setToken(response.data.access_token, 'Bearer')
        }).catch((error) => {
          console.error(error)
        })
        // TODO : HANDLE REFRESH TOKEN EXPIRED
        // if (app.$auth.strategy.refreshToken.status().expired()) {
        //   app.$auth.logout()
        // }
      }
    }
    return config
  })

  inject('api', api)
}
