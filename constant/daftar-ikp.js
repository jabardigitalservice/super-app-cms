export const headerDaftarIkp = [
  {
    key: 'narasi_ikp',
    text: 'Narasi IKP',
    sortable: true
  },
  {
    key: 'complaint_total',
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
    name: 'Semua Aduan',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-all-icon.svg'
  },
  followup: {
    id: 'followup',
    name: 'Ditindaklanjuti',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-followup-icon.svg'
  },
  finished: {
    id: 'finished',
    name: 'Selesai',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-finished-icon.svg'
  }
})
