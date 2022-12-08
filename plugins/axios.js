import { formatInTimeZone } from 'date-fns-tz'

export default function ({ $axios, $config }) {
  $axios.onRequest((config) => {
    const url = config.url
    if (!url.includes($config.keyclockBaseUrl)) {
      config.headers = {
        'Api-Key': $config.apiKey,
        'X-Timestamp': formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX")
      }
      // TODO : custom header using setHeader from nuxt/axios
      // $axios.setHeader('Api-Key', $config.apiKey)
      // $axios.setHeader('X-Timestamp', formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX"))
    } else {
      delete config.headers['Api-Key']
      delete config.headers['X-Timestamp']
    }
    return config
  })
}
