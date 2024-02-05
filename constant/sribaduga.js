export const listStatusSribaduga = [
  {
    statusCode: 'all',
    label: 'Semua Status',
    quantity: 0,
    icon: '/icon/ticket.svg',
    color: '',
  },
  {
    statusCode: 'scanned',
    label: 'Sudah Scan',
    quantity: 0,
    icon: '/icon/ticket.svg',
    color: 'text-green-700',
  },
  {
    statusCode: 'ordered',
    label: 'Belum Scan',
    quantity: 0,
    icon: '/icon/failed-ticket.svg',
    color: 'text-[#FF7500]',
  },
]

export const listKunjunganSribaduga = [
  {
    value: 'all',
    label: 'Semua Kunjungan',
  },
  {
    value: 'regular',
    label: 'Regular',
  },
  {
    value: 'reservasi',
    label: 'Reservasi',
  },
]

export const statusSribaduga = {
  all: { ...listStatusSribaduga[0] },
  scanned: { ...listStatusSribaduga[1] },
  ordered: { ...listStatusSribaduga[2] },
}
