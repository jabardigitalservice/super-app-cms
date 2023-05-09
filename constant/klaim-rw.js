export const headerTableKlaimRW = [
  {
    key: 'name',
    text: 'Nama Akun',
    sortable: true
  },
  {
    key: 'address',
    text: 'Alamat RW',
    sortable: false
  },
  {
    key: 'document',
    text: 'Dokumen SK RW',
    sortable: false
  },
  {
    key: 'date',
    text: 'Tanggal Registrasi',
    sortable: true
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false
  }
]

export const verifyConfirmationPopup = {
  title: 'Verifikasi Akun RW',
  descriptionText: 'Apakah Anda yakin ingin memverifikasi akun RW ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, verifikasi akun RW ini',
    variant: 'primary'
  }
}

export const verificationInformationPopup = {
  title: 'Verifikasi Akun RW',
  successInformation: {
    info: 'Verifikasi akun RW telah berhasil dilakukan.',
    message: 'Email terkait informasi verifikasi telah dikirimkan ke email akun RW bersangkutan.'
  },
  failedInformation: {
    info: 'Verifikasi akun RW gagal dilakukan.',
    message: ''
  }
}

export const rejectInformationPopup = {
  title: 'Penolakan Akun RW',
  successInformation: {
    info: 'Penolakan akun RW telah berhasil dilakukan.',
    message: 'Email terkait informasi penolakan telah dikirimkan ke email akun RW bersangkutan'
  },
  failedInformation: {
    info: 'Penolakan akun RW gagal dilakukan',
    message: ''
  }
}

export const userStatus = {
  waiting: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak'
}
