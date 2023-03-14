import { formatInTimeZone } from 'date-fns-tz'

export function generateItemsPerPageOptions (itemsPerPage) {
  const options = []
  for (let i = 1; i <= 5; i++) {
    options.push(itemsPerPage * i)
  }
  return options
}

export function formatDate (date, dateTime) {
  if (date) {
    return formatInTimeZone(date, 'Asia/Bangkok', 'dd/MM/yyyy')
  } else if (dateTime) {
    return formatInTimeZone(dateTime, 'Asia/Bangkok', 'dd/MM/yyyy HH:mm')
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
