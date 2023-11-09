import { UnleashClient } from 'unleash-proxy-client'

export default ({ $config }, inject) => {
  const unleash = new UnleashClient({
    url: $config.unleash.unleashURL,
    clientKey: $config.unleash.unleashToken,
    refreshInterval: 30,
    appName: 'sapawarga-cms'
  })
  inject('unleash', unleash)

  // Start the background polling
  unleash.start()
}
