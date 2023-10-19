export const listStatusTahura = [
  {
    statusCode: '',
    label: 'Semua Status',
    quantity: 0
  },
  {
    statusCode: 'scanned',
    label: 'Sudah Scan',
    quantity: 0
  },
  {
    statusCode: 'paid',
    label: 'Belum Scan',
    quantity: 0
  }
]

export const statusTahura = {
  all: { ...listStatusTahura[0], icon: '/icon/ticket.svg', color: '' },
  scanned: { ...listStatusTahura[1], icon: '/icon/ticket.svg', color: 'text-green-700' },
  paid: { ...listStatusTahura[2], icon: '/icon/failed-ticket.svg', color: 'text-[#FF7500]' }
}
