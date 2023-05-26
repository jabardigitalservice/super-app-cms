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
    Ya: 'Force Update',
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
    forceUpdate: 'Ya',
    majorVersion: '3',
    minorVersion: '1',
    patchNumber: '0',
    content: 'asdf'
  },
  {
    versiRilis: '3.1.0',
    status: 'deleted',
    date: '2023-05-18T13:23:15.935833Z',
    forceUpdate: 'Ya',
    majorVersion: '3',
    minorVersion: '1',
    patchNumber: '0',
    content: 'asdf'
  },
  {
    versiRilis: '3.0.9',
    status: 'released',
    date: '2023-05-19T13:23:15.935833Z',
    forceUpdate: 'Ya',
    majorVersion: '3',
    minorVersion: '1',
    patchNumber: '0',
    content: 'asdf'
  },
  {
    versiRilis: '3.0.8',
    status: 'released',
    date: '2023-06-19T13:23:15.935833Z',
    forceUpdate: 'Tidak',
    majorVersion: '3',
    minorVersion: '1',
    patchNumber: '0',
    content: 'asdf'
  }
]

export const savedConfirmationPopup = {
  title: 'Simpan Versi Rilis',
  descriptionText: 'Apakah Anda yakin ingin menyimpan versi ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, Simpan Sekarang',
    variant: 'primary'
  }
}

export const savedInformationPopup = {
  title: 'Simpan Versi Rilis',
  successInformation: {
    descriptionText: 'Versi Rilis berhasil disimpan',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  warningInformation: {
    descriptionText: 'Pastikan Anda mengisi field yang diminta terlebih dahulu.',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Versi Rilis gagal disimpan',
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

export const editConfirmationPopup = {
  title: 'Simpan Perubahaan',
  descriptionText: 'Apakah Anda yakin ingin perubahaan versi ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, Simpan Sekarang',
    variant: 'primary'
  }
}

export const editInformationPopup = {
  title: 'Perubahaan Versi Rilis',
  successInformation: {
    descriptionText: 'Versi Rilis berhasil diubah',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  warningInformation: {
    descriptionText: 'Pastikan Anda mengisi field yang diminta terlebih dahulu.',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Versi Rilis gagal diubah',
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
