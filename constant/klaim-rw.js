import { iconPopup } from '~/constant/icon-popup-new'

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
  nameModal: 'verification-confirmation',
  button: {
    label: 'Ya, verifikasi akun RW ini',
    variant: 'primary'
  }
}

export const verificationInformationPopup = {

  successInformation: {
    title: 'Verifikasi Akun RW',
    descriptionText: 'Verifikasi akun RW telah berhasil dilakukan.',
    message: 'Email terkait informasi verifikasi telah dikirimkan ke email akun RW bersangkutan.',
    icon: iconPopup.success
  },
  failedInformation: {
    title: 'Verifikasi Akun RW',
    descriptionText: 'Verifikasi akun RW gagal dilakukan.',
    message: '',
    icon: iconPopup.failed
  }
}

export const rejectConfirmationPopup = {
  title: 'Tolak Akun Rw',
  descriptionText: 'Apakah Anda yakin ingin menolak akun RW ini?',
  nameModal: 'reject-confirmation',
  button: {
    label: 'Tolak akun RW ini',
    variant: 'danger'
  }
}

export const rejectInformationPopup = {
  successInformation: {
    title: 'Penolakan Akun RW',
    descriptionText: 'Penolakan akun RW telah berhasil dilakukan.',
    message: 'Email terkait informasi penolakan telah dikirimkan ke email akun RW bersangkutan',
    icon: iconPopup.success
  },
  failedInformation: {
    title: 'Penolakan Akun RW',
    descriptionText: 'Penolakan akun RW gagal dilakukan',
    message: '',
    icon: iconPopup.success
  }
}

export const userStatus = {
  waiting: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak'
}
