import { formatInTimeZone } from 'date-fns-tz'

export default function ({ $axios, $config }) {
  $axios.onRequest((config) => {
    const url = config.url
    if (!url.includes($config.keyclockBaseUrl)) {
      $axios.setHeader('Api-Key', $config.apiKey)
      $axios.setHeader('X-Timestamp', formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX"))
    }

    return config
  })
}
