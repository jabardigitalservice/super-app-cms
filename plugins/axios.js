import { formatInTimeZone } from 'date-fns-tz'

export default function ({ $axios, $config }) {
  $axios.onRequest((config) => {
    const url = config.url
    if (!url.includes($config.keyclockBaseUrl)) {
      const customHeaders = {
        'Api-Key': $config.apiKey,
        'X-Timestamp': formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX")
      }
      const headers = config.headers
      config.headers = { ...headers, ...customHeaders }
    } else {
      delete config.headers['Api-Key']
      delete config.headers['X-Timestamp']
    }
    return config
  })
}
