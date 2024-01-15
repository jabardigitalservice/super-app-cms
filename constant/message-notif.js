import { iconPopup } from '~/constant/icon-popup'

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
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya Simpan',
    variant: 'primary'
  }
}

export const publishedInformationPopup = {
  successInformation: {
    title: 'Publikasi Pesan',
    descriptionText: 'Pesan berhasil dipublikasikan',
    icon: iconPopup[0]
  },
  failedInformation: {
    title: 'Publikasi Pesan',
    descriptionText: 'Pesan gagal dipublikasikan',
    icon: iconPopup[1]
  }
}

export const deleteInformationPopup = {
  successInformation: {
    title: 'Hapus Pesan',
    descriptionText: 'Pesan berhasil dihapus',
    icon: iconPopup[0]
  },
  failedInformation: {
    title: 'Hapus Pesan',
    descriptionText: 'Pesan gagal dihapus',
    icon: iconPopup[1]
  }
}

export const savedInformationPopup = {
  title: 'Simpan Pesan',
  successInformation: {
    descriptionText: 'Pesan berhasil disimpan',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  warningInformation: {
    descriptionText:
      'Pastikan Anda mengisi field yang diminta terlebih dahulu.',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Pesan gagal disimpan',
    dialogType: 'confirmation',
    buttonRight: {
      label: 'Coba Lagi',
      variant: 'primary'
    }
  },
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  }
}

export const messageStatus = {
  waiting: { id: 1, status: 'Menunggu Publikasi' },
  published: { id: 2, status: 'Dipublikasikan' },
  delete: { id: 3, status: 'Hapus' }
}
