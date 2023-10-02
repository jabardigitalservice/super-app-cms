export const complaintHeader = [
  { key: 'complaint_id', text: 'ID Aduan', sortable: true },
  { key: 'user_name', text: 'Nama Lengkap', sortable: true },
  { key: 'category', text: 'Kategori Aduan', sortable: true },
  { key: 'created_at', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const spanDivertedHeader = [
  ...complaintHeader.filter(item => item.key !== 'status' && item.key !== 'action'),
  { key: 'sp4n_created_at', text: 'Tanggal Diinput SP4N', sortable: true },
  { key: 'diverted_to_span_at', text: 'Tanggal Verifikasi SP4N', sortable: true },
  { key: 'sp4n_id', text: 'ID SP4N', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const aduanSpanHeader = [
  ...complaintHeader.filter(item => item.key !== 'action'),
  { key: 'created_at', text: 'Tanggal Diinput ke Sapawarga', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const determiningAuthorityHeader = [
  ...complaintHeader
]
determiningAuthorityHeader.splice(1, 0, { key: 'complaint_source', text: 'Sumber Aduan' })

export const typeAduan = {
  aduanMasuk: { props: 'aduan-masuk', label: 'Daftar Aduan Masuk', link: '/aduan/aduan-masuk', id: 'aduanMasuk' },
  aduanDialihkanSpanLapor: { props: 'aduan-dialihkan-span-lapor', label: 'Daftar Aduan Dialihkan Ke SP4N Lapor', link: '/aduan/dialihkan-ke-span-lapor', id: 'aduanDialihkanSpanLapor' },
  penentuanKewenangan: { props: 'penentuan-kewenangan', label: 'Daftar Penentuan Kewenangan', link: '/aduan/penentuan-kewenangan', id: 'penentuanKewenangan' }
}

export const complaintStatus = Object.freeze({
  total: { id: 'total', name: 'Semua Aduan', value: 0, statusColor: '', icon: '/icon/icon-aduan/complaint-icon.svg', typeAduan: ['all'] },
  unverified: { id: 'unverified', name: 'Menunggu Verifikasi', value: 0, statusColor: [{ color: 'yellow', typeAduan: typeAduan.aduanMasuk.props }], icon: '/icon/icon-aduan/complaint-wait-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props] },
  verified: { id: 'verified', name: 'Terverifikasi', value: 0, statusColor: [{ color: 'yellow', typeAduan: typeAduan.penentuanKewenangan.props }, { color: 'green', typeAduan: typeAduan.aduanMasuk.props }], icon: '/icon/icon-aduan/complaint-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.penentuanKewenangan.props] },
  failed: { id: 'failed', name: 'Gagal Diverifikasi', value: 0, statusColor: [{ color: 'red', typeAduan: typeAduan.aduanMasuk.props }], icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.aduanMasuk.props] },
  coordinated: { id: 'coordinated', name: 'Dikoordinasikan', value: 0, statusColor: [{ color: 'green', typeAduan: typeAduan.penentuanKewenangan.props }], icon: '/icon/icon-aduan/complaint-coordination-icon.svg', typeAduan: [typeAduan.penentuanKewenangan.props] },
  diverted_to_span: { id: 'diverted_to_span', name: 'Dialihkan ke SP4N Lapor', value: 0, statusColor: [{ color: 'green', typeAduan: typeAduan.penentuanKewenangan.props }], icon: '/icon/icon-aduan/complaint-span-icon.svg', typeAduan: [typeAduan.penentuanKewenangan.props, typeAduan.aduanDialihkanSpanLapor.props] },
  rejected: { id: 'rejected', name: 'Ditolak', value: 0, statusColor: [{ color: 'red', typeAduan: typeAduan.penentuanKewenangan.props }], icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.penentuanKewenangan.props] }
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
  }
}
