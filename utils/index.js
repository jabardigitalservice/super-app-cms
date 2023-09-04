import { formatInTimeZone } from 'date-fns-tz'
import { isValid } from 'date-fns'

export function generateItemsPerPageOptions (itemsPerPage) {
  const options = []
  for (let i = 1; i <= 5; i++) {
    options.push(itemsPerPage * i)
  }
  return options
}

export function formatDate (date, format = 'dd/MM/yyyy') {
  // check if valid date
  if (isValid(new Date(date))) {
    return formatInTimeZone(date, 'Asia/Bangkok', format)
  }
  return '-'
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

export function convertToRupiah (value) {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}

function dividerNumberHandle (value, divider) {
  let result = value / divider
  const mod = value % divider
  const digitTrunc = Math.trunc(result).toString() // for know digit without decimal
  if (mod !== 0) {
    if (divider <= 999999) {
      result = result.toString().slice(0, digitTrunc.length + 2)
    } else {
      result = result.toString().slice(0, digitTrunc.length + 3)
    }
  }

  return result.toLocaleString('id-ID').replace(',', '.')
}

export function formatNumberToUnit (value) {
  let result = value.toLocaleString('id-ID')
  if (value > 9999) {
    const digitValue = value.toString().length - 1
    const pow = Math.trunc(digitValue / 3)
    result = dividerNumberHandle(value, Math.pow(1000, pow))
  }
  return result
}

export function convertToUnit (value) {
  const units = ['', 'ribu', 'juta', 'miliyar', 'triliun']
  let unitIndex = 0
  if (value > 9999) {
    const digitValue = value.toString().length - 1
    const divider = 3 // divide 3, because increse unit to unit 3 digit
    const rawIndex = Math.floor(digitValue / divider) // get index for array of units
    unitIndex = Math.min(rawIndex, units.length - 1)
  }
  return units[unitIndex]
}
