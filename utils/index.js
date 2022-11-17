import { formatInTimeZone } from 'date-fns-tz'

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
