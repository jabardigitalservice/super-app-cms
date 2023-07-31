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
  failed: { id: 3, status: 'Gagal Diverifikasi' }
}
