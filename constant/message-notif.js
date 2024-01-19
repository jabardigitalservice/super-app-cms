import { iconPopup } from '~/constant/icon-popup-new'

export const messageNotifHeader = [
  { key: 'title', text: 'Judul Pesan', sortable: true },
  { key: 'createdAt', text: 'Dibuat pada', sortable: true },
  { key: 'publishedAt', text: 'Dikirim pada', sortable: true },
  { key: 'status', text: 'Status', sortable: true },
  // TODO: comment code for production
  // { key: 'targetPlatform', text: 'Target Platform', sortable: true },
  // { key: 'topic', text: 'Topik', sortable: true },
  { key: 'action', text: 'Aksi' }
]

export const deleteConfirmationPopup = {
  title: 'Konfirmasi Hapus',
  descriptionText: 'Apakah Anda yakin ingin menghapus pesan ini?',
  nameModal: 'delete-confirmation',
  button: {
    label: 'Hapus Pesan',
    variant: 'danger'
  }
}

export const publishedConfirmationPopup = {
  title: 'Konfirmasi Publikasi',
  descriptionText: 'Apakah Anda yakin ingin mempublikasi pesan ini?',
  nameModal: 'publish-confirmation',
  button: {
    label: 'Ya Publikasikan',
    variant: 'primary'
  }
}

export const savedConfirmationPopup = {
  title: 'Konfirmasi Simpan',
  descriptionText: 'Apakah Anda yakin ingin menyimpan pesan ini?',
  nameModal: 'save-confirmation',
  button: {
    label: 'Ya Simpan',
    variant: 'primary'
  }
}

export const publishedInformationPopup = {
  successInformation: {
    title: 'Publikasi Pesan',
    descriptionText: 'Pesan berhasil dipublikasikan',
    icon: iconPopup.success
  },
  failedInformation: {
    title: 'Publikasi Pesan',
    descriptionText: 'Pesan gagal dipublikasikan',
    icon: iconPopup.failed
  }
}

export const deleteInformationPopup = {
  successInformation: {
    title: 'Hapus Pesan',
    descriptionText: 'Pesan berhasil dihapus',
    icon: iconPopup.success
  },
  failedInformation: {
    title: 'Hapus Pesan',
    descriptionText: 'Pesan gagal dihapus',
    icon: iconPopup.failed
  }
}

export const savedInformationPopup = {

  successInformation: {
    title: 'Simpan Pesan',
    descriptionText: 'Pesan berhasil disimpan',
    icon: iconPopup.success
  },
  warningInformation: {
    title: 'Isian Belum Lengkap',
    descriptionText:
      'Pastikan Anda mengisi field yang diminta terlebih dahulu.',
    icon: iconPopup.warning
  },
  failedInformation: {
    title: 'Simpan Pesan',
    descriptionText: 'Pesan gagal disimpan',
    icon: iconPopup.failed
  }
}

export const messageStatus = {
  waiting: { id: 1, status: 'Menunggu Publikasi' },
  published: { id: 2, status: 'Dipublikasikan' },
  delete: { id: 3, status: 'Hapus' }
}
