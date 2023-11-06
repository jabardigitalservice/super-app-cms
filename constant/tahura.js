export const listStatusTahura = [
  {
    statusCode: 'all',
    label: 'Semua Status',
    quantity: 0,
    icon: '/icon/ticket.svg',
    color: ''
  },
  {
    statusCode: 'scanned',
    label: 'Sudah Scan',
    quantity: 0,
    icon: '/icon/ticket.svg',
    color: 'text-green-700'
  },
  {
    statusCode: 'paid',
    label: 'Belum Scan',
    quantity: 0,
    icon: '/icon/failed-ticket.svg',
    color: 'text-[#FF7500]'
  }
]

export const statusTahura = {
  all: { ...listStatusTahura[0] },
  scanned: { ...listStatusTahura[1] },
  paid: { ...listStatusTahura[2] }
}
