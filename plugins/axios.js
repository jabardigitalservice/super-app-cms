export default function ({ $axios, $config, app }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        'Api-Key': $config.apiKey
      }
    }
  })

  api.onRequest((config) => {
    if (app.$auth.loggedIn) {
      const token = app.$auth.strategy.token.get().split(' ')[1]
      api.setToken(token, 'Bearer')
    }
  })

  inject('api', api)
}
