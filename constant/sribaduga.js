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
    statusCode: 'verified',
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
    value: 'reservation',
    label: 'Reservasi',
  },
]
export const listKategoriTiketSribaduga = [
  {
    value: '',
    label: 'Semua Kategori Tiket',
  },
  {
    value: 'Anak-anak',
    label: 'Anak-anak',
  },
  {
    value: 'Dewasa',
    label: 'Dewasa',
  },
  {
    value: 'Wisatawan Mancanegara',
    label: 'Wisatawan Mancanegara',
  },
]
export const listKategoriInstansi = [
  {
    value: 'TK/RA',
    label: 'TK/RA',
  },
  {
    value: 'SD/MI',
    label: 'SD/MI',
  },
  {
    value: 'SMP/MTS',
    label: 'SMP/MTS',
  },
  {
    value: 'SMA/SMK/MA',
    label: 'SMA/SMK/MA',
  },
  {
    value: 'Perguruan Tinggi',
    label: 'Perguruan Tinggi',
  },
  {
    value: 'Umum',
    label: 'Umum',
  },
  {
    value: 'Wisatawan Mancanegara',
    label: 'Wisatawan Mancanegara',
  },
]

export const statusSribaduga = {
  all: { ...listStatusSribaduga[0] },
  scanned: { ...listStatusSribaduga[1] },
  verified: { ...listStatusSribaduga[2] },
}
