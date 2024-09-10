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
  instruksiKewenanganNonPemprov: {
    props: 'instruksi-kewenangan-non-pemprov',
    label: 'Instruksi Kewenangan Non Pemprov',
    link: '/aduan/instruksi-kewenangan-non-pemprov',
    id: 'instruksiKewenanganNonPemprov',
  },
  instruksiAduanWarga: {
    props: 'instruksi-aduan-warga',
    label: 'Daftar Instruksi Aduan Warga',
    link: '/aduan/instruksi-aduan-warga',
    id: 'instruksiAduan',
  },
  instruksiNonPemprov: {
    props: 'instruksi-non-pemprov',
    label: 'Daftar Instruksi Aduan Non Pemprov',
    link: '/aduan/instruksi-non-pemprov',
    id: 'instruksiNonPemprov',
  },
}

export const ikpStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua Instruksi',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-all-icon.svg',
    statusColor: '-',
    ikpType: ['all'],
  },
  coordinated: {
    id: 'coordinated',
    name: 'Dikoordinasikan',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    statusColor: [
      { color: 'yellow', ikpType: [ikpType.instruksiKewenanganPemprov.props] },
      {
        color: 'green',
        ikpType: [
          ikpType.instruksiKewenanganNonPemprov.props,
          ikpType.instruksiNonPemprov.props,
        ],
      },
    ],
    ikpType: [
      ikpType.instruksiKewenanganNonPemprov.props,
      ikpType.instruksiNonPemprov.props,
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
    ikpType: [
      ikpType.instruksiKewenanganPemprov.props,
      ikpType.instruksiAduanWarga.props,
    ],
  },
  not_yet_coordinated: {
    id: 'not_yet_coordinated',
    name: 'Belum Dikoordinasikan',
    icon: '/icon/icon-aduan/complaint-status/complaint-not-yet-coordinated.svg',
    value: 0,
    statusColor: [
      {
        color: 'light-blue',
        ikpType: [ikpType.instruksiKewenanganNonPemprov.props],
      },
      {
        color: 'yellow',
        ikpType: [ikpType.instruksiNonPemprov.props],
      },
    ],
    ikpType: [
      ikpType.instruksiKewenanganNonPemprov.props,
      ikpType.instruksiNonPemprov.props,
    ],
  },
  postponed: {
    id: 'postponed',
    name: 'Pengerjaan Ditunda',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-postponed-icon.svg',
    statusColor: [
      {
        color: 'purple',
        ikpType: [
          ikpType.instruksiKewenanganPemprov.props,
          ikpType.instruksiAduanWarga.props,
        ],
      },
    ],
    ikpType: [
      ikpType.instruksiKewenanganPemprov.props,
      ikpType.instruksiAduanWarga.props,
    ],
  },
  review: {
    id: 'review',
    name: 'Ditinjau Ulang',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-review-icon.svg',
    statusColor: [
      {
        color: 'dark-blue',
        ikpType: [
          ikpType.instruksiKewenanganPemprov.props,
          ikpType.instruksiAduanWarga.props,
        ],
      },
    ],
    ikpType: [
      ikpType.instruksiKewenanganPemprov.props,
      ikpType.instruksiAduanWarga.props,
    ],
  },
  finished: {
    id: 'finished',
    name: 'Selesai',
    value: 0,
    icon: '/icon/icon-aduan/complaint-status/complaint-finished-icon.svg',
    statusColor: [
      {
        color: 'green',
        ikpType: [
          ikpType.instruksiKewenanganPemprov.props,
          ikpType.instruksiAduanWarga.props,
        ],
      },
    ],
    ikpType: [
      ikpType.instruksiKewenanganPemprov.props,
      ikpType.instruksiAduanWarga.props,
    ],
  },
})
