export const complaintHeader = [
  { key: 'complaint_id', text: 'ID Aduan', sortable: true },
  { key: 'user_name', text: 'Nama Lengkap', sortable: true },
  { key: 'category', text: 'Kategori Aduan', sortable: true },
  { key: 'created_at', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const aduanSpanHeader = [
  { key: 'id', text: 'ID Aduan', sortable: true },
  { key: 'name', text: 'Nama Lengkap', sortable: true },
  { key: 'created_at', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'createdSpanAt', text: 'Tanggal Diinput SP4N', sortable: true },
  { key: 'verificationSpan', text: 'Tanggal Verifikasi SP4N', sortable: true },
  { key: 'spanID', text: 'ID SP4N', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const typeAduan = {
  aduanMasuk: { props: 'aduan-masuk', label: 'Daftar Aduan Masuk', link: '/aduan/aduan-masuk' },
  aduanDiProses: { props: 'aduan-di-proses', label: 'Daftar Aduan Dirposes', link: '/aduan/aduan-diproses' },
  aduanSpanLapor: { props: 'aduan-span-lapor', label: 'Daftar Aduan Dialihkan Ke SP4N Lapor', link: '/aduan/aduan-span-lapor' }
}

export const complaintStatus = Object.freeze({
  total: { id: 'total', name: 'Semua Aduan', value: 0, statusColor: '', icon: '/icon/icon-aduan/complaint-icon.svg', typeAduan: ['all'] },
  unverified: { id: 'unverified', name: 'Menunggu Verifikasi', value: 0, statusColor: '[#FF9500]', icon: '/icon/icon-aduan/complaint-wait-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  verified: { id: 'verified', name: 'Terverifikasi', value: 0, statusColor: '[#1E88E5]', icon: '/icon/icon-aduan/complaint-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  failed: { id: 'failed', name: 'Gagal Diverifikasi', value: 0, statusColor: '[#DD5E5E]', icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  coordinated: { id: 'coordinated', name: 'Dikoordinasikan', value: 0, statusColor: '[#16A75C]', icon: '/icon/icon-aduan/complaint-coordination-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] },
  diverted_to_span: { id: 'diverted_to_span', name: 'Dialihkan ke SP4N Lapor', value: 0, statusColor: '[#16A75C]', icon: '/icon/icon-aduan/complaint-span-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] },
  rejected: { id: 'rejected', name: 'Ditolak', value: 0, statusColor: '[#EF5350]', icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] }
})
