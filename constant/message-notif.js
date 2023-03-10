export const messageNotifHeader = [
  { key: 'title', text: 'Judul Pesan', sortable: true },
  { key: 'createdDate', text: 'Dibuat pada', sortable: true },
  { key: 'publishDate', text: 'Dikirim pada', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const messageStatus = {
  waiting: { id: 1, status: 'Menunggu Publikasi' },
  published: { id: 2, status: 'Dipublikasikan' },
  delete: { id: 3, status: 'Hapus' }
}
