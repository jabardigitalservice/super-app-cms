export const listStatusTahura = [
  {
    value: '',
    label: 'Semua Status'
  },
  {
    value: 'scanned',
    label: 'Sudah Scan'
  },
  {
    value: 'paid',
    label: 'Belum Scan'
  }
]

export const statusTahura = {
  all: { ...listStatusTahura[0], icon: '/icon/ticket.svg', color: '' },
  scanned: { ...listStatusTahura[1], icon: '/icon/ticket.svg', color: 'text-green-700' },
  paid: { ...listStatusTahura[2], icon: '/icon/failed-ticket.svg', color: 'text-[#FF7500]' }
}
