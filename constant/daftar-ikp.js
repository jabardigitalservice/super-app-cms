export const headerDaftarIkp = [
  { key: 'ikp_code', text: 'ID Instruksi', sortable: true },
  {
    key: 'narrative',
    text: 'Narasi Instruksi',
    sortable: true,
  },
  {
    key: 'complaints_count',
    text: 'Jml Aduan',
    sortable: true,
  },
  {
    key: 'created_at',
    text: 'Tanggal Dibuat',
    sortable: true,
  },
  {
    key: 'deadline_at',
    text: 'Tanggal Deadline',
    sortable: true,
  },
  {
    key: 'complaint_status_id',
    text: 'Status',
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false,
  },
]

export const ikpType = {
  instruksiKewenanganPemprov: {
    props: 'instruksi-kewenangan-pemprov',
    label: 'Instruksi Kewenangan Pemprov',
    link: '/aduan/instruksi-kewenangan-pemprov',
    id: 'instruksiKewenanganPemprov',
  },
  instruksiAduanWarga: {
    props: 'instruksi-aduan-warga',
    label: 'Daftar Instruksi Aduan Warga',
    link: '/aduan/instruksi-aduan-warga',
    id: 'instruksiAduan',
  },
}

export const ikpStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua Instruksi',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-all-icon.svg',
    statusColor: '-',
  },
  coordinated: {
    id: 'coordinated',
    name: 'Dikoordinasikan',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    statusColor: [
      { color: 'yellow', ikpType: [ikpType.instruksiKewenanganPemprov.props] },
    ],
  },
  followup: {
    id: 'followup',
    name: 'Ditindaklanjuti',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-followup-icon.svg',
    statusColor: [
      {
        color: 'light-blue',
        ikpType: [ikpType.instruksiKewenanganPemprov.props],
      },
      { color: 'yellow', ikpType: [ikpType.instruksiAduanWarga.props] },
    ],
  },
  postponed: {
    id: 'postponed',
    name: 'Pengerjaan Ditunda',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-postponed-icon.svg',
    statusColor: 'purple',
  },
  review: {
    id: 'review',
    name: 'Ditinjau Ulang',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-review-icon.svg',
    statusColor: 'dark-blue',
  },
  finished: {
    id: 'finished',
    name: 'Selesai',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-finished-icon.svg',
    statusColor: 'green',
  },
})
