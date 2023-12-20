export const headerDaftarIkp = [
  {
    key: 'narasi_ikp',
    text: 'Narasi IKP',
    sortable: true
  },
  {
    key: 'complaints_count',
    text: 'Jml Aduan',
    sortable: true
  },
  {
    key: 'created_at',
    text: 'Tanggal Dibuat',
    sortable: true
  },
  {
    key: 'deadline_at',
    text: 'Tanggal Deadline',
    sortable: true
  },
  {
    key: 'complaint_status_id',
    text: 'Status',
    sortable: true
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false
  }
]

export const ikpStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua IKP',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-all-icon.svg',
    statusColor: ''
  },
  coordinated: {
    id: 'coordinated',
    name: 'Dikoordinasikan',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    statusColor: 'yellow'
  },
  followup: {
    id: 'followup',
    name: 'Ditindaklanjuti',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-followup-icon.svg',
    statusColor: 'light-blue'
  },
  postponed: {
    id: 'postponed',
    name: 'Pengerjaan Ditunda',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-postponed-icon.svg',
    statusColor: 'purple'
  },
  review: {
    id: 'review',
    name: 'Ditinjau Ulang',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-review-icon.svg',
    statusColor: 'dark-blue'
  },
  finished: {
    id: 'finished',
    name: 'Selesai',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-finished-icon.svg',
    statusColor: 'green'
  }
})
