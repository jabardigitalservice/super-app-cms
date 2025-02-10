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
  // TO DO :The column is requested to be hidden first because we cannot get the SP4N verification date data from the SP4N api
  // {
  //   key: 'diverted_to_span_at',
  //   text: 'Tanggal Verifikasi SP4N',
  //   sortable: true,
  // },
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
  key: 'sp4n_created_at',
  text: 'Tanggal Diinput SP4N',
  sortable: true,
})

export const typeAduan = {
  aduanMasuk: {
    props: 'aduan-masuk',
    label: 'Daftar Aduan Masuk',
    link: '/aduan/aduan-masuk',
    id: 'aduanMasuk',
    phase: 'verification',
  },
  aduanDialihkanHotlineJabar: {
    props: 'aduan-dialihkan-hotline-jabar',
    label: 'Daftar Aduan Hotline Jabar',
    link: '/aduan/aduan-hotline-jabar',
    id: 'aduanDialihkanHotlineJabar',
    phase: 'hotlinejabar',
  },
  aduanDialihkanSpanLapor: {
    props: 'aduan-dialihkan-span-lapor',
    label: 'Daftar Aduan Dialihkan Ke SP4N Lapor',
    link: '/aduan/dialihkan-ke-span-lapor',
    id: 'aduanDialihkanSpanLapor',
    phase: 'authorization',
  },
  penentuanKewenangan: {
    props: 'penentuan-kewenangan',
    label: 'Daftar Penentuan Kewenangan',
    link: '/aduan/penentuan-kewenangan',
    id: 'penentuanKewenangan',
    phase: 'authorization',
  },
  aduanDariSpanLapor: {
    props: 'aduan-dari-soab-lapor',
    label: 'Daftar Aduan dari SP4N Lapor',
    link: '/aduan/aduan-dari-span-lapor',
    id: 'aduanDariSpanLapor',
    phase: 'authorization',
  },
  instruksiKewenanganPemprov: {
    props: 'instruksi-kewenangan-pemprov',
    label: 'Instruksi Kewenangan Pemprov',
    link: '/aduan/instruksi-kewenangan-pemprov',
    id: 'instruksiKewenanganPemprov',
    phase: 'coordination',
  },
  instruksiKewenanganNonPemprov: {
    props: 'instruksi-kewenangan-non-pemprov',
    label: 'Instruksi Kewenangan Non-Pemprov',
    link: '/aduan/instruksi-kewenangan-non-pemprov',
    id: 'instruksiKewenanganNonPemprov',
    phase: 'sp4n',
  },
  instruksiAduanWarga: {
    props: 'instruksi-aduan-warga',
    id: 'instruksiAduanWarga',
    phase: 'coordination',
  },
  instruksiNonPemprov: {
    props: 'instruksi-non-pemprov',
    label: 'Daftar Instruksi Aduan Non Pemprov',
    link: '/aduan/instruksi-non-pemprov',
    id: 'instruksiNonPemprov',
    phase: 'sp4n',
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
    name: 'Belum Diinstruksikan',
    value: 0,
    statusColor: [
      {
        color: 'yellow',
        typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    typeAduan: [typeAduan.instruksiKewenanganNonPemprov.props],
  },
  not_yet_coordinated: {
    id: 'not_yet_coordinated',
    name: 'Belum Dikoordinasikan',
    value: 0,
    statusColor: [
      {
        color: 'light-blue',
        typeAduan: [
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.instruksiNonPemprov.props,
        ],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-followup-icon.svg',
    typeAduan: [
      typeAduan.instruksiKewenanganNonPemprov.props,
      typeAduan.instruksiNonPemprov.props,
    ],
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
        typeAduan: [
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
        ],
      },
    ],
    icon: '/icon/icon-aduan/complaint-status/complaint-coordinated-icon.svg',
    typeAduan: [
      typeAduan.penentuanKewenangan.props,
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiKewenanganNonPemprov.props,
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
  followupHotlineJabar: {
    idButton: 'button-followup-hotline-jabar',
    label: 'Tindaklanjuti Aduan',
    variant: 'primary',
    complaintStatus: complaintStatus.verified.id,
  },
  evidenceFollowupHotlineJabar: {
    idButton: 'button-evidence-followup-hotline-jabar',
    label: 'Upload Tindaklanjuti Aduan',
    variant: 'primary',
    complaintStatus: complaintStatus.followup.id,
  },

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

export const detailField = {
  generalInformation: {
    title: 'Informasi Umum',
    field: [
      {
        name: 'ID Aduan',
        key: 'complaint_id',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'ID SP4N Lapor',
        key: 'sp4n_id',
        menu: [
          typeAduan.aduanDialihkanSpanLapor.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiNonPemprov.props,
        ],
        complaintStatus: [
          complaintStatus.diverted_to_span.id,
          complaintStatus.coordinated.id,
          complaintStatus.failed.id,
          complaintStatus.verified.id,
          complaintStatus.not_yet_instructed.id,
          complaintStatus.not_yet_coordinated.id,
        ],
      },
      {
        name: 'Sumber Aduan',
        key: 'complaint_source',
        menu: [typeAduan.penentuanKewenangan.props],
        complaintStatus: ['all'],
      },
      {
        name: 'Tanggal Aduan Masuk',
        key: 'created_at_format',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Tanggal Diinput ke SP4N',
        key: 'sp4n_created_at_format',
        menu: [
          typeAduan.aduanDialihkanSpanLapor.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.instruksiNonPemprov.props,
        ],
        complaintStatus: ['all'],
      },
      {
        name: 'Tanggal Deadline',
        key: 'deadline_at_format',
        menu: [typeAduan.aduanDialihkanHotlineJabar.props],
        complaintStatus: ['all'],
      },
      {
        name: 'Status',
        key: 'complaint_status_id',
        menu: [
          typeAduan.aduanMasuk.props,
          typeAduan.aduanDialihkanHotlineJabar.props,
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
        ],
        complaintStatus: ['all'],
      },
      {
        name: 'Cakupan Urusan',
        key: 'coverage_of_affairs',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.aduanDialihkanSpanLapor.props,
        ],
        complaintStatus: [
          complaintStatus.diverted_to_span.id,
          complaintStatus.coordinated.id,
          complaintStatus.followup.id,
          complaintStatus.review.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
          complaintStatus.not_yet_instructed.id,
          complaintStatus.not_yet_coordinated.id,
        ],
      },
      {
        name: 'Perubahan Deadline',
        key: 'ikp_deadline_at_format',
        menu: [typeAduan.instruksiKewenanganPemprov.props],
        complaintStatus: [
          complaintStatus.postponed.id,
          complaintStatus.review.id,
          complaintStatus.finished.id,
        ],
      },
      {
        name: 'Dokumen Bukti',
        key: 'document_evidence',
        menu: [typeAduan.instruksiKewenanganPemprov.props],
        complaintStatus: [
          complaintStatus.postponed.id,
          complaintStatus.review.id,
          complaintStatus.finished.id,
        ],
      },
      {
        name: 'Alasan',
        key: 'complaint_status_note',
        menu: [typeAduan.aduanMasuk.props],
        complaintStatus: [
          complaintStatus.failed.id,
          complaintStatus.directed_to_hotline_jabar.id,
        ],
      },
      {
        name: 'Alasan Dialihkan ke Hotline Jabar',
        key: 'directed_to_hotline_jabar_note',
        menu: [typeAduan.aduanDialihkanHotlineJabar.props],
        complaintStatus: ['all'],
      },
    ],
    menu: ['all'],
    complaintStatus: ['all'],
  },
  institutionInformation: {
    title: 'Informasi Instansi',
    field: [
      {
        name: 'Nama Instansi',
        key: 'opd_name',
        menu: [
          typeAduan.aduanDialihkanSpanLapor.props,
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.instruksiAduanWarga.props,
          typeAduan.instruksiNonPemprov.props,
        ],
        complaintStatus: [
          complaintStatus.diverted_to_span.id,
          complaintStatus.coordinated.id,
          complaintStatus.followup.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
          complaintStatus.not_yet_instructed.id,
          complaintStatus.not_yet_coordinated.id,
        ],
      },
      {
        name: 'Nama Kepala Perangkat Daerah',
        key: 'opd_pic',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiAduanWarga.props,
        ],
        complaintStatus: [
          complaintStatus.coordinated.id,
          complaintStatus.followup.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
        ],
      },
      {
        name: 'Pemda Penanggungjawab',
        key: 'opd_pemprov_name',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.aduanDialihkanSpanLapor.props,
          typeAduan.instruksiKewenanganNonPemprov.props,
          typeAduan.instruksiNonPemprov.props,
        ],
        complaintStatus: [
          complaintStatus.diverted_to_span.id,
          complaintStatus.not_yet_instructed.id,
          complaintStatus.not_yet_coordinated.id,
          complaintStatus.coordinated.id,
        ],
      },
    ],
    menu: [
      typeAduan.aduanDialihkanSpanLapor.props,
      typeAduan.penentuanKewenangan.props,
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiKewenanganNonPemprov.props,
      typeAduan.instruksiAduanWarga.props,
      typeAduan.instruksiNonPemprov.props,
    ],
    complaintStatus: [
      complaintStatus.diverted_to_span.id,
      complaintStatus.coordinated.id,
      complaintStatus.followup.id,
      complaintStatus.postponed.id,
      complaintStatus.finished.id,
      complaintStatus.not_yet_instructed.id,
      complaintStatus.not_yet_coordinated.id,
    ],
  },
  otherInformation: {
    title: 'Informasi Lainnya',
    field: [
      {
        name: 'Tanggal Deadline',
        key: 'deadline_at_format',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiAduanWarga.props,
        ],
        complaintStatus: [
          complaintStatus.diverted_to_span.id,
          complaintStatus.coordinated.id,
          complaintStatus.followup.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
        ],
      },
      {
        name: 'Tingkat Urgensi',
        key: 'urgency_level',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiAduanWarga.props,
        ],
        complaintStatus: [
          complaintStatus.coordinated.id,
          complaintStatus.followup.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
        ],
      },
      {
        name: 'Keterangan Status',
        key: 'status_description',
        menu: [
          typeAduan.penentuanKewenangan.props,
          typeAduan.instruksiKewenanganPemprov.props,
          typeAduan.instruksiAduanWarga.props,
        ],
        complaintStatus: [
          complaintStatus.coordinated.id,
          complaintStatus.diverted_to_span.id,
          complaintStatus.rejected.id,
          complaintStatus.followup.id,
          complaintStatus.postponed.id,
          complaintStatus.finished.id,
        ],
      },
    ],
    menu: [
      typeAduan.penentuanKewenangan.props,
      typeAduan.instruksiKewenanganPemprov.props,
      typeAduan.instruksiAduanWarga.props,
    ],
    complaintStatus: [
      complaintStatus.diverted_to_span.id,
      complaintStatus.coordinated.id,
      complaintStatus.rejected.id,
      complaintStatus.followup.id,
      complaintStatus.postponed.id,
      complaintStatus.finished.id,
    ],
  },
  trackingSpan: {
    title: 'Status SP4N Lapor',
    field: [
      {
        name: 'Status SP4N Lapor',
        key: 'tracking_span',
        menu: [typeAduan.aduanDialihkanSpanLapor.props],
        complaintStatus: [complaintStatus.diverted_to_span.id],
      },
    ],
    menu: [typeAduan.aduanDialihkanSpanLapor.props],
    complaintStatus: [complaintStatus.diverted_to_span.id],
  },
  userInformation: {
    title: 'Informasi Pelapor',
    field: [
      {
        name: 'Nama Lengkap',
        key: 'user_name',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'No. Kontak',
        key: 'user_phone',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Email',
        key: 'user_email',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Titik Lokasi Pelapor',
        key: 'report_location_point',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Koordinat',
        key: 'coordinate',
        menu: ['all'],
        complaintStatus: ['all'],
      },
    ],
    menu: ['all'],
    complaintStatus: ['all'],
  },
  complaintDetail: {
    title: 'Detail Aduan',
    field: [
      {
        name: 'Kategori Aduan',
        key: 'complaint_category',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Sub Kategori Aduan',
        key: 'complaint_sub_category',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Judul Aduan',
        key: 'title',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Detail Aduan',
        key: 'description',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Lokasi Kejadian',
        key: 'incident_location',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Kabupaten / Kota',
        key: 'city_name',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Kecamatan',
        key: 'district_name',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Kelurahan',
        key: 'subdistrict_name',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Detail Lokasi Kejadian',
        key: 'address_detail',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Titik Lokasi Kejadian',
        key: 'incident_location_point',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Latitude',
        key: 'latitude',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Longitude',
        key: 'longitude',
        menu: ['all'],
        complaintStatus: ['all'],
      },
      {
        name: 'Map',
        key: 'map',
        menu: ['all'],
        complaintStatus: ['all'],
      },
    ],
    menu: ['all'],
    complaintStatus: ['all'],
  },
}
