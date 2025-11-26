export const headerTableKlaimRW = [
  {
    key: 'name',
    text: 'Nama Akun',
    sortable: true,
  },
  {
    key: 'address',
    text: 'Alamat RW',
    sortable: false,
  },
  {
    key: 'document',
    text: 'Dokumen SK RW',
    sortable: false,
  },
  {
    key: 'date',
    text: 'Tanggal Registrasi',
    sortable: true,
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true,
  },
  {
    key: 'action',
    text: 'Aksi',
    sortable: false,
  },
]

export const headerTableKlaimLurah = [...headerTableKlaimRW]
headerTableKlaimLurah.splice(
  1,
  2,
  { key: 'address', text: 'Alamat Lurah', sortable: false },
  {
    key: 'document',
    text: 'Dokumen SK Lurah',
    sortable: false,
  }
)

export const headerTableKlaimKepalaDesa = [...headerTableKlaimRW]
headerTableKlaimKepalaDesa.splice(
  1,
  2,
  { key: 'address', text: 'Alamat Kepala Desa', sortable: false },
  {
    key: 'document',
    text: 'Dokumen SK Kelapa Desa',
    sortable: false,
  }
)

export const headerTableKlaimCamat = [...headerTableKlaimRW]
headerTableKlaimCamat.splice(
  1,
  2,
  { key: 'address', text: 'Alamat Camat', sortable: false },
  {
    key: 'document',
    text: 'Dokumen SK Camat',
    sortable: false,
  }
)

export const headerTableKlaimPosyandu = [...headerTableKlaimRW]
headerTableKlaimPosyandu.splice(
  1,
  2,
  { key: 'address', text: 'Alamat Posyandu', sortable: false },
  {
    key: 'document',
    text: 'Dokumen SK Posyandu',
    sortable: false,
  }
)

export const verifyConfirmationPopup = {
  klaimRw: {
    title: 'Verifikasi Akun RW',
    descriptionText: 'Apakah Anda yakin ingin memverifikasi akun RW ini?',
    buttonSubmit: {
      label: 'Ya, verifikasi akun RW ini',
      variant: 'primary',
    },
  },
  klaimLurah: {
    title: 'Verifikasi Akun Lurah',
    descriptionText: 'Apakah Anda yakin ingin memverifikasi akun Lurah ini?',
    buttonSubmit: {
      label: 'Ya, verifikasi akun Lurah ini',
      variant: 'primary',
    },
  },
  klaimKepalaDesa: {
    title: 'Verifikasi Akun Kepala Desa',
    descriptionText:
      'Apakah Anda yakin ingin memverifikasi akun Kepala Desa ini?',
    buttonSubmit: {
      label: 'Ya, verifikasi akun Kepala Desa ini',
      variant: 'primary',
    },
  },
  klaimCamat: {
    title: 'Verifikasi Akun Camat',
    descriptionText: 'Apakah Anda yakin ingin memverifikasi akun Camat ini?',
    buttonSubmit: {
      label: 'Ya, verifikasi akun Camat ini',
      variant: 'primary',
    },
  },
  klaimPosyandu: {
    title: 'Verifikasi Akun Posyandu',
    descriptionText: 'Apakah Anda yakin ingin memverifikasi akun Posyandu ini?',
    buttonSubmit: {
      label: 'Ya, verifikasi akun Posyandu ini',
      variant: 'primary',
    },
  },
  dialogType: 'confirmation',
  buttonCancel: {
    label: 'Batal',
    variant: 'secondary',
  },
}

export const rejectionConfirmationPopup = {
  klaimRw: {
    title: 'Tolak Akun RW',
    descriptionText: 'Apakah Anda yakin ingin menolak akun RW ini?',
    buttonSubmit: {
      label: 'Tolak akun RW ini',
      variant: 'danger',
    },
  },
  klaimLurah: {
    title: 'Tolak Akun Lurah',
    descriptionText: 'Apakah Anda yakin ingin menolak akun Lurah ini?',
    buttonSubmit: {
      label: 'Tolak akun Lurah ini',
      variant: 'danger',
    },
  },
  klaimKepalaDesa: {
    title: 'Tolak Akun Kepala Desa',
    descriptionText: 'Apakah Anda yakin ingin menolak akun Kepala Desa ini?',
    buttonSubmit: {
      label: 'Tolak akun Kepala Desa ini',
      variant: 'danger',
    },
  },
  klaimCamat: {
    title: 'Tolak Akun Camat',
    descriptionText: 'Apakah Anda yakin ingin menolak akun Camat ini?',
    buttonSubmit: {
      label: 'Tolak akun Camat ini',
      variant: 'danger',
    },
  },
  klaimPosyandu: {
    title: 'Tolak Akun Posyandu',
    descriptionText: 'Apakah Anda yakin ingin menolak akun Posyandu ini?',
    buttonSubmit: {
      label: 'Tolak akun Posyandu ini',
      variant: 'danger',
    },
  },
  dialogType: 'confirmation',
  buttonCancel: {
    label: 'Batal',
    variant: 'secondary',
  },
}

export const verificationInformationPopup = {
  klaimRw: {
    title: 'Verifikasi Akun RW',
    successInformation: {
      info: 'Verifikasi akun RW telah berhasil dilakukan.',
      message:
        'Email terkait informasi verifikasi telah dikirimkan ke email akun RW bersangkutan.',
    },
    failedInformation: {
      info: 'Verifikasi akun RW gagal dilakukan.',
      message: '',
    },
  },
  klaimLurah: {
    title: 'Verifikasi Akun Lurah',
    successInformation: {
      info: 'Verifikasi akun Lurah telah berhasil dilakukan.',
      message:
        'Email terkait informasi verifikasi telah dikirimkan ke email akun Lurah bersangkutan.',
    },
    failedInformation: {
      info: 'Verifikasi akun Lurah gagal dilakukan.',
      message: '',
    },
  },
  klaimKepalaDesa: {
    title: 'Verifikasi Akun Kepala Desa',
    successInformation: {
      info: 'Verifikasi akun Kepala Desa telah berhasil dilakukan.',
      message:
        'Email terkait informasi verifikasi telah dikirimkan ke email akun Kepala Desa bersangkutan.',
    },
    failedInformation: {
      info: 'Verifikasi akun Kepala Desa gagal dilakukan.',
      message: '',
    },
  },
  klaimCamat: {
    title: 'Verifikasi Akun Camat',
    successInformation: {
      info: 'Verifikasi akun Camat telah berhasil dilakukan.',
      message:
        'Email terkait informasi verifikasi telah dikirimkan ke email akun Camat bersangkutan.',
    },
    failedInformation: {
      info: 'Verifikasi akun Camat gagal dilakukan.',
      message: '',
    },
  },
  klaimPosyandu: {
    title: 'Verifikasi Akun Posyandu',
    successInformation: {
      info: 'Verifikasi akun Posyandu telah berhasil dilakukan.',
      message:
        'Email terkait informasi verifikasi telah dikirimkan ke email akun Posyandu bersangkutan.',
    },
    failedInformation: {
      info: 'Verifikasi akun Posyandu gagal dilakukan.',
      message: '',
    },
  },
}

export const rejectInformationPopup = {
  klaimRw: {
    title: 'Penolakan Akun RW',
    successInformation: {
      info: 'Penolakan akun RW telah berhasil dilakukan.',
      message:
        'Email terkait informasi penolakan telah dikirimkan ke email akun RW bersangkutan',
    },
    failedInformation: {
      info: 'Penolakan akun RW gagal dilakukan',
      message: '',
    },
  },
  klaimLurah: {
    title: 'Penolakan Akun Lurah',
    successInformation: {
      info: 'Penolakan akun Lurah telah berhasil dilakukan.',
      message:
        'Email terkait informasi penolakan telah dikirimkan ke email akun Lurah bersangkutan',
    },
    failedInformation: {
      info: 'Penolakan akun Lurah gagal dilakukan',
      message: '',
    },
  },
  klaimKepalaDesa: {
    title: 'Penolakan Akun Kepala Desa',
    successInformation: {
      info: 'Penolakan akun Kepala Desa telah berhasil dilakukan.',
      message:
        'Email terkait informasi penolakan telah dikirimkan ke email akun Kepala Desa bersangkutan',
    },
    failedInformation: {
      info: 'Penolakan akun Kepala Desa gagal dilakukan',
      message: '',
    },
  },
  klaimCamat: {
    title: 'Penolakan Akun Camat',
    successInformation: {
      info: 'Penolakan akun Camat telah berhasil dilakukan.',
      message:
        'Email terkait informasi penolakan telah dikirimkan ke email akun Camat bersangkutan',
    },
    failedInformation: {
      info: 'Penolakan akun Camat gagal dilakukan',
      message: '',
    },
  },
  klaimPosyandu: {
    title: 'Penolakan Akun Posyandu',
    successInformation: {
      info: 'Penolakan akun Posyandu telah berhasil dilakukan.',
      message:
        'Email terkait informasi penolakan telah dikirimkan ke email akun Posyandu bersangkutan',
    },
    failedInformation: {
      info: 'Penolakan akun Posyandu gagal dilakukan',
      message: '',
    },
  },
}

export const userStatus = {
  waiting: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak',
}

export const typeClaim = {
  klaimRw: {
    props: 'klaim-rw',
    label: 'Klaim Akun RW',
    link: '/',
    name: 'RW',
    id: 'klaimRw',
  },
  klaimLurah: {
    props: 'klaim-lurah',
    label: 'Klaim Akun Lurah',
    link: '/klaim/lurah',
    name: 'Lurah',
    id: 'klaimLurah',
  },
  klaimKepalaDesa: {
    props: 'klaim-kepala-desa',
    label: 'Klaim Akun Kepala Desa',
    link: '/klaim/kepala-desa',
    name: 'Kepala Desa',
    id: 'klaimKepalaDesa',
  },
  klaimCamat: {
    props: 'klaim-camat',
    label: 'Klaim Akun Camat',
    link: '/klaim/camat',
    name: 'Camat',
    id: 'klaimCamat',
  },
  klaimPosyandu: {
    props: 'klaim-posyandu',
    label: 'Klaim Akun Posyandu',
    link: '/klaim/posyandu',
    name: 'Posyandu',
    id: 'klaimPosyandu',
  },
}
