export default function ({ $axios, $config }) {
  $axios.onRequest((config) => {
    const url = config.url
    if (!url.includes($config.keyclockBaseUrl)) {
      $axios.setHeader('Api-Key', $config.apiKey)
    }

    return config
  })
}
