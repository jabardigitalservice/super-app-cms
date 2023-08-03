export const complaintHeader = [
  { key: 'complaintId', text: 'ID Aduan', sortable: true },
  { key: 'fullName', text: 'Nama Lengkap', sortable: true },
  { key: 'complaintCategory', text: 'Kategori Aduan', sortable: true },
  { key: 'createdAt', text: 'Tanggal Aduan Masuk', sortable: true },
  { key: 'complaintStatus', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const complaintStatus = {
  waiting: { id: 1, status: 'Menunggu Verifikasi' },
  success: { id: 2, status: 'Terverifikasi' },
  failed: { id: 3, status: 'Gagal Diverifikasi' },
  coordination: { id: 4, status: 'Dikoordinasikan' },
  redirecttospan: { id: 5, status: 'Dialihkan ke SP4N Lapor' },
  rejected: { id: 6, status: 'Ditolak' }
}

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
