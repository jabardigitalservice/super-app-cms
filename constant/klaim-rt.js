export const headerTableKlaimRT = [
  {
    key: 'name',
    text: 'Nama Akun',
    sortable: true
  },
  {
    key: 'address',
    text: 'Alamat RT',
    sortable: false
  },
  {
    key: 'document',
    text: 'Dokumen SK RT',
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
  title: 'Verifikasi Akun RT',
  descriptionText: 'Apakah Anda yakin ingin memverifikasi akun RT ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya, verifikasi akun RT ini',
    variant: 'primary'
  }
}

export const verificationInformationPopup = {
  title: 'Verifikasi Akun RT',
  successInformation: {
    info: 'Verifikasi akun RT telah berhasil dilakukan.',
    message: 'Email terkait informasi verifikasi telah dikirimkan ke email akun RT bersangkutan.'
  },
  failedInformation: {
    info: 'Verifikasi akun RT gagal dilakukan.',
    message: ''
  }
}

export const rejectInformationPopup = {
  title: 'Penolakan Akun RT',
  successInformation: {
    info: 'Penolakan akun RT telah berhasil dilakukan.',
    message: 'Email terkait informasi penolakan telah dikirimkan ke email akun RT bersangkutan'
  },
  failedInformation: {
    info: 'Penolakan akun RT gagal dilakukan',
    message: ''
  }
}

export const userStatus = {
  waiting: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak'
}
