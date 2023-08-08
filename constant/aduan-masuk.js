export const complaintHeader = [
  { key: 'complaintId', text: 'ID Aduan', sortable: true },
  { key: 'fullName', text: 'Nama Lengkap', sortable: true },
  { key: 'complaintCategory', text: 'Kategori Aduan', sortable: true },
  { key: 'createdAt', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'complaintStatus', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const complaintStatus = [
  { id: 'total', name: 'Semua Aduan', icon: '/icon/icon-aduan/complaint-icon.svg' },
  { id: 'unverified', name: 'Menunggu Verifikasi', icon: '/icon/icon-aduan/complaint-wait-verify-icon.svg' },
  { id: 'verified', name: 'Terverifikasi', icon: '/icon/icon-aduan/complaint-verify-icon.svg' },
  { id: 'failed', name: 'Gagal Diverifikasi', icon: '/icon/icon-aduan/complaint-failed-icon.svg' },
  { id: 'coordination', name: 'Dikoordinasikan', icon: '/icon/icon-aduan/complaint-coordination-icon.svg' },
  { id: 'divertedtospan', name: 'Dialihkan ke SP4N Lapor', icon: '/icon/icon-aduan/complaint-span-icon.svg' },
  { id: 'rejected', name: 'Ditolak', icon: '/icon/icon-aduan/complaint-failed-icon.svg' }
]

export const aduanSpanHeader = [
  { key: 'complaintId', text: 'ID Aduan', sortable: true },
  { key: 'fullName', text: 'Nama Lengkap', sortable: true },
  { key: 'createdAt', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'createdSpanAt', text: 'Tanggal Diinput SP4N', sortable: true },
  { key: 'verificationSpan', text: 'Tanggal Verifikasi SP4n', sortable: true },
  { key: 'spanID', text: 'ID SP4N', sortable: true },
  { key: 'complaintStatus', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const typeAduan = {
  aduanMasuk: 'aduan-masuk',
  aduanDiProses: 'aduan-di-proses',
  aduanSpanLapor: 'aduan-span-lapor'
}
