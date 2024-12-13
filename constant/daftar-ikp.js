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
        ikpType: [
          ikpType.instruksiKewenanganPemprov.props,
          ikpType.instruksiKewenanganNonPemprov.props,
        ],
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
          ikpType.instruksiKewenanganNonPemprov.props,
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

export const detailField = {
  generalInformation: {
    title: 'Informasi Umum',
    field: [
      { name: 'Narasi Instruksi', key: 'narrative', ikpType: ['all'] },
      { name: 'Jumlah Aduan', key: 'complaint_total', ikpType: ['all'] },
      { name: 'Status', key: 'complaint_status_id', ikpType: ['all'] },
      { name: 'Keterangan', key: 'description', ikpType: ['all'] },
    ],
    ikpType: ['all'],
  },
  date: {
    title: 'Tanggal',
    field: [
      { name: 'Tanggal Dibuat', key: 'created_at', ikpType: ['all'] },
      { name: 'Tanggal Deadline', key: 'deadline_at', ikpType: ['all'] },
    ],
    ikpType: ['all'],
  },
  indicator: {
    title: 'Indikator',
    field: [
      {
        name: 'Indikator Nilai',
        key: 'indicator_value',
        ikpType: [
          ikpType.instruksiAduanWarga.props,
          ikpType.instruksiKewenanganPemprov.props,
        ],
      },
      {
        name: 'Indikator Satuan',
        key: 'indicator_unit',
        ikpType: [
          ikpType.instruksiAduanWarga.props,
          ikpType.instruksiKewenanganPemprov.props,
        ],
      },
    ],
    ikpType: [
      ikpType.instruksiAduanWarga.props,
      ikpType.instruksiKewenanganPemprov.props,
    ],
  },
  others: {
    title: 'Lainnya',
    field: [
      {
        name: 'Cakupan Urusan',
        key: 'scope_of_affairs',
        ikpType: [ikpType.instruksiKewenanganNonPemprov.props],
      },
      {
        name: 'Instansi Penanggung Jawab',
        key: 'responsible_agency',
        ikpType: [
          ikpType.instruksiKewenanganNonPemprov.props,
          ikpType.instruksiNonPemprov.props,
        ],
      },
      {
        name: 'Pemda Penanggung Jawab',
        key: 'responsible_provincial_government_opd',
        ikpType: [ikpType.instruksiKewenanganNonPemprov.props],
      },
      {
        name: 'Perangkat Daerah',
        key: 'opd_name',
        ikpType: [
          ikpType.instruksiAduanWarga.props,
          ikpType.instruksiKewenanganPemprov.props,
        ],
      },
    ],
    ikpType: ['all'],
  },
}
