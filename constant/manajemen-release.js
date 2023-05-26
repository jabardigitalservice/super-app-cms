export const headerTable = [
  {
    key: 'versiRilis',
    text: 'Versi Rilis',
    sortable: true
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true
  },
  {
    key: 'date',
    text: 'Tanggal Rilis',
    sortable: true
  },
  {
    key: 'forceUpdate',
    text: 'Force Update',
    sortable: true
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false
  }
]

export const statusTable = {
  waiting: 'Menunggu Rilis',
  deleted: 'Dihapus',
  released: 'Berhasil Rilis'
}

export const dummmyData = [
  {
    versiRilis: '3.1.1',
    status: 'waiting',
    date: '',
    forceUpdate: true,
    majorVersion: 3,
    minorVersion: 1,
    patchNumber: 0
  },
  {
    versiRilis: '3.1.0',
    status: 'deleted',
    date: '2023-05-18T13:23:15.935833Z',
    forceUpdate: true,
    majorVersion: 3,
    minorVersion: 1,
    patchNumber: 0
  },
  {
    versiRilis: '3.0.9',
    status: 'released',
    date: '2023-05-19T13:23:15.935833Z',
    forceUpdate: true,
    majorVersion: 3,
    minorVersion: 1,
    patchNumber: 0
  },
  {
    versiRilis: '3.0.8',
    status: 'released',
    date: '2023-06-19T13:23:15.935833Z',
    forceUpdate: false,
    majorVersion: 3,
    minorVersion: 1,
    patchNumber: 0
  }
]

export const deleteConfirmationPopup = {
  title: 'Hapus Versi',
  descriptionText: 'Apakah Anda yakin ingin menghapus versi ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, Hapus Sekarang',
    variant: 'danger'
  }
}

export const deleteInformationPopup = {
  title: 'Hapus Versi',
  successInformation: {
    descriptionText: 'Hapus versi telah berhasil dilakukan',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Versi gagal dihapus',
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

export const verificationConfirmationPopup = {
  title: 'Rilis Versi',
  descriptionText: 'Apakah Anda yakin ingin merilis versi ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, Rilis Sekarang',
    variant: 'primary'
  }
}

export const verificationInformationPopup = {
  title: 'Rilis Versi',
  successInformation: {
    descriptionText: 'Perlisan versi telah berhasil dilakukan',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Versi gagal dirilis',
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
