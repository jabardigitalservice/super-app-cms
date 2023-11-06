export const complaintHeader = [
  { key: 'complaint_id', text: 'ID Aduan', sortable: true },
  { key: 'user_name', text: 'Nama Lengkap', sortable: true },
  { key: 'category', text: 'Kategori Aduan' },
  { key: 'created_at_format', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'status', text: 'Status' },
  { key: 'action', text: 'Aksi' }
]

export const complaintDivertedToSpanHeader = [...complaintHeader]
complaintDivertedToSpanHeader.splice(4, 1,
  { key: 'sp4n_created_at', text: 'Tanggal Diinput SP4N', sortable: true },
  {
    key: 'diverted_to_span_at',
    text: 'Tanggal Verifikasi SP4N',
    sortable: true
  },
  { key: 'sp4n_id', text: 'ID SP4N' }
)

export const complaintFromSpanHeader = [
  { key: 'complaint_id', text: 'ID Aduan Sapawarga', sortable: true },
  { key: 'sp4n_id', text: 'ID Aduan SP4N ' },
  { key: 'user_name', text: 'Nama Lengkap', sortable: true },
  { key: 'category', text: 'Kategori Aduan' },
  {
    key: 'created_at_format',
    text: 'Tanggal Diinput ke Sapawarga',
    sortable: true
  },
  { key: 'action', text: 'Áksi' }
]

export const determiningAuthorityHeader = [...complaintHeader]
determiningAuthorityHeader.splice(1, 0, {
  key: 'complaint_source',
  text: 'Sumber Aduan'
})

export const typeAduan = {
  aduanMasuk: {
    props: 'aduan-masuk',
    label: 'Daftar Aduan Masuk',
    link: '/aduan/aduan-masuk',
    id: 'aduanMasuk'
  },
  aduanDialihkanSpanLapor: {
    props: 'aduan-dialihkan-span-lapor',
    label: 'Daftar Aduan Dialihkan Ke SP4N Lapor',
    link: '/aduan/dialihkan-ke-span-lapor',
    id: 'aduanDialihkanSpanLapor'
  },
  penentuanKewenangan: {
    props: 'penentuan-kewenangan',
    label: 'Daftar Penentuan Kewenangan',
    link: '/aduan/penentuan-kewenangan',
    id: 'penentuanKewenangan'
  },
  aduanDariSpanLapor: {
    props: 'aduan-dari-soab-lapor',
    label: 'Daftar Aduan dari SP4N Lapor',
    link: '/aduan/aduan-dari-span-lapor',
    id: 'aduanDariSpanLapor'
  }
}

export const complaintStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua Aduan',
    value: 0,
    statusColor: '',
    icon: '/icon/icon-aduan/complaint-icon.svg',
    typeAduan: ['all']
  },
  unverified: {
    id: 'unverified',
    name: 'Menunggu Verifikasi',
    value: 0,
    statusColor: [{ color: 'yellow', typeAduan: typeAduan.aduanMasuk.props }],
    icon: '/icon/icon-aduan/complaint-wait-verify-icon.svg',
    typeAduan: [typeAduan.aduanMasuk.props]
  },
  verified: {
    id: 'verified',
    name: 'Terverifikasi',
    value: 0,
    statusColor: [
      { color: 'yellow', typeAduan: typeAduan.penentuanKewenangan.props },
      { color: 'green', typeAduan: typeAduan.aduanMasuk.props }
    ],
    icon: '/icon/icon-aduan/complaint-verify-icon.svg',
    typeAduan: [
      typeAduan.aduanMasuk.props,
      typeAduan.penentuanKewenangan.props
    ]
  },
  failed: {
    id: 'failed',
    name: 'Gagal Diverifikasi',
    value: 0,
    statusColor: [{ color: 'red', typeAduan: typeAduan.aduanMasuk.props }],
    icon: '/icon/icon-aduan/complaint-failed-icon.svg',
    typeAduan: [typeAduan.aduanMasuk.props]
  },
  coordinated: {
    id: 'coordinated',
    name: 'Dikoordinasikan',
    value: 0,
    statusColor: [
      { color: 'green', typeAduan: typeAduan.penentuanKewenangan.props }
    ],
    icon: '/icon/icon-aduan/complaint-coordination-icon.svg',
    typeAduan: [typeAduan.penentuanKewenangan.props]
  },
  diverted_to_span: {
    id: 'diverted_to_span',
    name: 'Dialihkan ke SP4N Lapor',
    value: 0,
    statusColor: [
      { color: 'green', typeAduan: typeAduan.penentuanKewenangan.props }
    ],
    icon: '/icon/icon-aduan/complaint-span-icon.svg',
    typeAduan: [
      typeAduan.penentuanKewenangan.props,
      typeAduan.aduanDialihkanSpanLapor.props
    ]
  },
  rejected: {
    id: 'rejected',
    name: 'Ditolak',
    value: 0,
    statusColor: [
      { color: 'red', typeAduan: typeAduan.penentuanKewenangan.props }
    ],
    icon: '/icon/icon-aduan/complaint-failed-icon.svg',
    typeAduan: [typeAduan.penentuanKewenangan.props]
  }
})

export const complaintButtonDetail = {
  failed: {
    idButton: 'button-confirmation-failed',
    label: 'Gagal Terverifikasi',
    variant: 'secondary',
    classButton: '!text-red-400 !border-2 !border-red-400',
    complaintStatus: complaintStatus.unverified.id
  },
  verified: {
    idButton: 'button-confirmation-verification',
    label: 'Terverifikasi',
    variant: 'primary',
    complaintStatus: complaintStatus.unverified.id
  },
  addIdSpan: {
    idButton: 'button-add-id-span',
    label: 'Tambahkan ID SP4N Lapor',
    variant: 'primary',
    complaintStatus: 'no-id-span'
  },
  complaintProcess: {
    idButton: 'button-complaint-process',
    label: 'Proses Aduan',
    variant: 'primary',
    complaintStatus: complaintStatus.verified.id
  }
}
