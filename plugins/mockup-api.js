// import { formatInTimeZone } from 'date-fns-tz'

export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: $config.urlMockApi,
  })

  // Inject to context as $api
  inject('mockApi', api)
}
