export const complaintHeader = [
  { key: 'id', text: 'ID Aduan', sortable: true },
  { key: 'name', text: 'Nama Lengkap', sortable: true },
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

export const complaintStatus = [
  { id: 'total', name: 'Semua Aduan', value: 150, statusColor: '', icon: '/icon/icon-aduan/complaint-icon.svg', typeAduan: ['all'] },
  { id: 'unverified', name: 'Menunggu Verifikasi', value: 2000, statusColor: 'text-yellow-800', icon: '/icon/icon-aduan/complaint-wait-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  { id: 'verified', name: 'Terverifikasi', value: 300, statusColor: 'text-blue-600', icon: '/icon/icon-aduan/complaint-verify-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  { id: 'failed', name: 'Gagal Diverifikasi', value: 1000, statusColor: 'text-[#DD5E5E]', icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.aduanMasuk.props, typeAduan.aduanSpanLapor.props] },
  { id: 'coordination', name: 'Dikoordinasikan', value: 25000, statusColor: 'text-green-600', icon: '/icon/icon-aduan/complaint-coordination-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] },
  { id: 'divertedtospan', name: 'Dialihkan ke SP4N Lapor', value: 123, statusColor: 'text-green-600', icon: '/icon/icon-aduan/complaint-span-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] },
  { id: 'rejected', name: 'Ditolak', value: 2312, statusColor: 'text-red-400', icon: '/icon/icon-aduan/complaint-failed-icon.svg', typeAduan: [typeAduan.aduanDiProses.props] }
]
