import { formatInTimeZone } from 'date-fns-tz'

import VueJwtDecode from 'vue-jwt-decode'

export function generateItemsPerPageOptions (itemsPerPage) {
  const options = []
  for (let i = 1; i <= 5; i++) {
    options.push(itemsPerPage * i)
  }
  return options
}

export function formatDate (date) {
  if (date) {
    return formatInTimeZone(date, 'Asia/Bangkok', 'dd/MM/yyyy')
  } else {
    return '-'
  }
}

export function base64ToBlobUrl (base64, type) {
  const binStr = atob(base64)
  const len = binStr.length
  const arr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i)
  }
  const blob = new Blob([arr], { type })
  const url = URL.createObjectURL(blob)
  return url
}

export function isAdmin (auth) {
  const tokenBearer = auth.strategy.token.get()
  const token = tokenBearer.split(' ')
  const tokenDecode = VueJwtDecode.decode(token[1])
  if (tokenDecode.realm_access.roles.includes('admin')) {
    return 'rw'
  } else {
    return 'tiket'
  }
}
