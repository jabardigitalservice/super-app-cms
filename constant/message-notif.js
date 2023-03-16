export const messageNotifHeader = [
  { key: 'title', text: 'Judul Pesan', sortable: true },
  { key: 'createdAt', text: 'Dibuat pada', sortable: true },
  { key: 'publishedAt', text: 'Dikirim pada', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const deleteConfirmationPopup = {
  title: 'Konfirmasi Hapus',
  descriptionText: 'Apakah Anda yakin ingin menghapus pesan ini?',
  labelButton: 'Hapus Pesan',
  confirmationType: 'reject'
}

export const publishedConfirmationPopup = {
  title: 'Konfirmasi Publikasi',
  descriptionText: 'Apakah Anda yakin ingin mempublikasi pesan ini?',
  labelButton: 'Ya Publikasikan',
  confirmationType: 'verify'
}

export const publishedInformationPopup = {
  title: 'Publikasi Pesan',
  descriptionSuccessText: 'Pesan berhasil dipublikasikan',
  descriptionFailedText: 'Pesan gagal dipublikasikan',
  labelSuccessButton: 'Saya mengerti',
  labelFailedButton: 'Coba Lagi'
}

export const deleteInformationPopup = {
  title: 'Hapus Pesan',
  descriptionSuccessText: 'Pesan berhasil dihapus',
  descriptionFailedText: 'Pesan gagal dihapus',
  labelSuccessButton: 'Saya mengerti',
  labelFailedButton: 'Coba Lagi'
}

export const messageStatus = {
  waiting: { id: 1, status: 'Menunggu Publikasi' },
  published: { id: 2, status: 'Dipublikasikan' },
  delete: { id: 3, status: 'Hapus' }
}
