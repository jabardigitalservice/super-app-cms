import { formatInTimeZone } from 'date-fns-tz'

export default function ({ $axios, $config, app }) {
  // encodes a message, then calculates its SHA-256 digest, and Converting a digest to a hex string
  async function digestMessage (message) {
    // console.log({ message })
    const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8) // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
    return hashHex.toLowerCase()
  }

  // Hash AccessToken and API-Key
  async function getHashedAccessToken () {
    const accessToken = app.$auth.strategy.token.get().split(' ')[1] || ''
    const accessTokenApiKeyHashed = await digestMessage(`${accessToken}:${$config.apiKey}`)
    return accessTokenApiKeyHashed
  }

  // Hash Data (body or params)
  async function getHashedData (method, params, payload) {
    let data = ''
    if (method === 'get') {
      if (params) {
        const paramsLength = Object.keys(params).length
        for (const [index, [key, value]] of Object.entries(params).entries()) {
          data += (index + 1) < paramsLength ? `${key}=${value}&` : `${key}=${value}`
        }
      } else {
        data = '?'
      }
    } else if (payload) {
      data = JSON.stringify(payload)
    } else {
      data = '{}'
    }
    const dataHashed = await digestMessage(data)
    return dataHashed
  }

  $axios.onRequest(async (config) => {
    const { url, method, params, data: payload } = config
    const { clientId, secretId } = app.$auth.strategy.options

    if (!url.includes($config.keyclockBaseUrl)) {
      const accessTokenApiKeyHashed = await getHashedAccessToken()
      console.log('1. ', { accessTokenApiKeyHashed })

      const dataHashed = await getHashedData(method, params, payload)
      console.log('2. ', { dataHashed })

      const key = btoa(`${clientId}:${secretId}`)
      console.log('3. ', { key })

      // strToSign = HTTPMethod + ":" + EndpointURL + ":" + accessTokenApiKeyHashed + ":" + dataHased + ":" + TimeStamp(RFC3339) + ":" + Localization
      // signature = base64(signature)

      $axios.setHeader('Api-Key', $config.apiKey)
      $axios.setHeader('X-Timestamp', formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX"))
    }

    return config
  })
}
