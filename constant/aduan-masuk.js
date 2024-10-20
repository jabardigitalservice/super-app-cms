export const complaintHeader = [
  { key: 'complaint_id', text: 'ID Aduan', sortable: true },
  { key: 'user_name', text: 'Nama Lengkap', sortable: true },
  { key: 'category', text: 'Kategori Aduan' },
  { key: 'created_at_format', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'status', text: 'Status' },
  { key: 'action', text: 'Aksi' },
]

export const complaintDivertedToSpanHeader = [...complaintHeader]
complaintDivertedToSpanHeader.splice(
  4,
  1,
  { key: 'sp4n_created_at', text: 'Tanggal Diinput SP4N', sortable: true },
  {
    key: 'diverted_to_span_at',
    text: 'Tanggal Verifikasi SP4N',
    sortable: true,
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
    sortable: true,
  },
  { key: 'action', text: 'Áksi' },
]

export const determiningAuthorityHeader = [...complaintHeader]
determiningAuthorityHeader.splice(1, 0, {
  key: 'complaint_source_name',
  text: 'Sumber Aduan',
})

export const nonGovernmentAuthorityHeader = [...complaintHeader]
nonGovernmentAuthorityHeader.splice(1, 0, {
  key: 'sp4n_id',
  text: 'ID SP4N',
  sortable: true,
})
nonGovernmentAuthorityHeader.splice(4, 0, {
  key: 'sp4n_added_at',
  text: 'Tanggal Diinput SP4N',
  sortable: true,
})

export const typeAduan = {
  aduanMasuk: {
    props: 'aduan-masuk',
    label: 'Daftar Aduan Masuk',
    link: '/aduan/aduan-masuk',
    id: 'aduanMasuk',
  },
  aduanDialihkanHotlineJabar: {
    props: 'aduan-dialihkan-hotline-jabar',
    label: 'Daftar Aduan Hotline Jabar',
    link: '/aduan/aduan-hotline-jabar',
    id: 'aduanDialihkanHotlineJabar',
  },
  aduanDialihkanSpanLapor: {
    props: 'aduan-dialihkan-span-lapor',
    label: 'Daftar Aduan Dialihkan Ke SP4N Lapor',
    link: '/aduan/dialihkan-ke-span-lapor',
    id: 'aduanDialihkanSpanLapor',
  },
  penentuanKewenangan: {
    props: 'penentuan-kewenangan',
    label: 'Daftar Penentuan Kewenangan',
    link: '/aduan/penentuan-kewenangan',
    id: 'penentuanKewenangan',
  },
  aduanDariSpanLapor: {
    props: 'aduan-dari-soab-lapor',
    label: 'Daftar Aduan dari SP4N Lapor',
    link: '/aduan/aduan-dari-span-lapor',
    id: 'aduanDariSpanLapor',
  },
  instruksiKewenanganPemprov: {
    props: 'instruksi-kewenangan-pemprov',
    label: 'Instruksi Kewenangan Pemprov',
    link: '/aduan/instruksi-kewenangan-pemprov',
    id: 'instruksiKewenanganPemprov',
  },
  instruksiKewenanganNonPemprov: {
    props: 'instruksi-kewenangan-non-pemprov',
    label: 'Instruksi Kewenangan Non-Pemprov',
    link: '/aduan/instruksi-kewenangan-non-pemprov',
    id: 'instruksiKewenanganNonPemprov',
  },
  instruksiAduanWarga: {
    props: 'instruksi-aduan-warga',
    id: 'instruksiAduanWarga',
  },
  instruksiNonPemprov: {
    props: 'instruksi-non-pemprov',
    label: 'Daftar Instruksi Aduan Non Pemprov',
    link: '/aduan/instruksi-non-pemprov',
    id: 'instruksiNonPemprov',
  },
}

export const complaintSource = {
  sapawarga: {
    id: 'sapawarga',
    name: 'Sapawarga',
    logo: 'sapawarga.svg',
  },
  span: {
    id: 'sp4n',
    name: 'SP4N Lapor',
    logo: 'span-lapor.svg',
  },
  jotform: {
    id: 'jotform',
    name: 'Jotform',
    logo: null,
  },
}

export const complaintStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua Aduan',
    value: 0,
    statusColor: '',
    icon: '/icon/icon-aduan/complaint-status/complaint-all-icon.svg',
    typeAduan: ['all'],
  },
  unverified: {
    id: 'unverified',
    name: 'Menunggu Verifikasi',
    value: 0,
    statusColor: [{ color: 'yellow', typeAduan: [typeAduan.aduanMasuk.props] }],
    icon: '/icon/icon-aduan/complaint-status/complaint-unverified-icon.svg',
    typeAduan: [typeAduan.aduanMasuk.props],
  },
  verified: {
    id: 'verified',
    name: 'Terverifikasi',
    value: 0,
    statusColor: [
      {
        color: 'yellow',
        typeAduan: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.aduanDialihkanHotlineJabar.props,
        ],
      },
      { color: 'green', typeAduan: [typeAduan.aduanMasuk.props] },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-verify-icon.svg',
    typeAduan: [
      typeAduan.aduanMasuk.props,
      typeAduan.aduanDialihkanHotlineJabar.props,
      typeAduan.penentuanKewenangan.props,
    ],
  },
  failed: {
    id: 'failed',
    name: 'Gagal Diverifikasi',
    value: 0,
    statusColor: [{ color: 'red', typeAduan: [typeAduan.aduanMasuk.props] }],
    icon: '/icon/icon-aduan/complaint-status/complaint-failed-icon.svg',
    typeAduan: [typeAduan.aduanMasuk.props],
  },
  directed_to_hotline_jabar: {
    id: 'directed_to_hotline_jabar',
    name: 'Dialihkan ke Hotline Jabar',
    value: 0,
    statusColor: [
      {
        color: 'purple',
        typeAduan: [typeAduan.aduanMasuk.props],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-redirect-to-hotline-jabar.svg',
    typeAduan: [typeAduan.aduanMasuk.props],
  },
  not_yet_instructed: {
    id: 'not_yet_instructed',
    name: 'Belum Diistruksikan',
    value: 0,
    statusColor: [
      {
        color: 'yellow',
        typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
      },
    ],
    icon: '-',
    typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
  },
  not_yet_coordinated: {
    id: 'not_yet_coordinated',
    name: 'Belum Dikoordinasikan',
    value: 0,
    statusColor: [
      {
        color: 'light-blue',
        typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
      },
    ],
    icon: '-',
    typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
  },
  coordinated: {
    id: 'coordinated',
    name: 'Dikoordinasikan',
    value: 0,
    statusColor: [
      {
        color: 'green',
        typeAduan: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
        ],
      },
      {
        color: 'yellow',
        typeAduan: [typeAduan.instruksiKewenanganPemprov.props],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    typeAduan: [
      typeAduan.penentuanKewenangan.props,
      typeAduan.instruksiKewenanganPemprov.props,
    ],
  },
  diverted_to_span: {
    id: 'diverted_to_span',
    name: 'Dialihkan ke SP4N Lapor',
    value: 0,
    statusColor: [
      { color: 'green', typeAduan: [typeAduan.penentuanKewenangan.props] },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-diverted-to-span-icon.svg',
    typeAduan: [
      typeAduan.penentuanKewenangan.props,
      typeAduan.aduanDialihkanSpanLapor.props,
    ],
  },
  rejected: {
    id: 'rejected',
    name: 'Ditolak',
    value: 0,
    statusColor: [
      { color: 'red', typeAduan: [typeAduan.penentuanKewenangan.props] },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-rejected-icon.svg',
    typeAduan: [typeAduan.penentuanKewenangan.props],
  },
  followup: {
    id: 'followup',
    name: 'Ditindaklanjuti',
    value: 0,
    statusColor: [
      {
        color: 'light-blue',
        typeAduan: [
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.aduanDialihkanHotlineJabar.props,
        ],
      },
      { color: 'yellow', typeAduan: [typeAduan.instruksiAduanWarga.props] },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-followup-icon.svg',
    typeAduan: [
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiAduanWarga.props,
      typeAduan.aduanDialihkanHotlineJabar.props,
    ],
  },
  postponed: {
    id: 'postponed',
    name: 'Pengerjaan Ditunda',
    value: 0,
    statusColor: [
      {
        color: 'purple',
        typeAduan: [typeAduan.instruksiKewenanganPemprov.props],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-postponed-icon.svg',
    typeAduan: [
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiAduanWarga.props,
    ],
  },
  review: {
    id: 'review',
    name: 'Ditinjau Ulang',
    value: 0,
    statusColor: [
      {
        color: 'dark-blue',
        typeAduan: [typeAduan.instruksiKewenanganPemprov.props],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-review-icon.svg',
    typeAduan: [
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiAduanWarga.props,
    ],
  },
  finished: {
    id: 'finished',
    name: 'Selesai',
    value: 0,
    statusColor: [
      {
        color: 'green',
        typeAduan: [
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.aduanDialihkanHotlineJabar.props,
        ],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-finished-icon.svg',
    typeAduan: [
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiAduanWarga.props,
      typeAduan.aduanDialihkanHotlineJabar.props,
    ],
  },
})

export const complaintButtonDetail = {
  addIdSpan: {
    idButton: 'button-add-id-span',
    label: 'Tambahkan ID SP4N Lapor',
    variant: 'primary',
    complaintStatus: 'no-id-span',
  },
  complaintProcess: {
    idButton: 'button-complaint-process',
    label: 'Proses Aduan',
    variant: 'primary',
    complaintStatus: complaintStatus.verified.id,
  },
  followup: {
    idButton: 'button-followup',
    label: 'Tindaklanjuti Aduan',
    variant: 'primary',
    complaintStatus: complaintStatus.coordinated.id,
  },
}
