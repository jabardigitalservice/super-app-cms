export const headerTicketMuseum = [
  {
    key: 'fileId',
    text: 'Bukti Pembayaran',
    sortable: false
  },
  {
    key: 'invoice',
    text: 'ID Pembayaran',
    sortable: false
  },
  {
    key: 'amount',
    text: 'Total Pembayaran',
    sortable: true
  },
  {
    key: 'sessionName',
    text: 'sesi',
    sortable: true
  },
  {
    key: 'reservationDate',
    text: 'Tanggal Reservasi',
    sortable: true
  },
  {
    key: 'ticketCount',
    text: 'Jumlah Tiket',
    sortable: true
  },
  {
    key: 'status',
    text: 'Status',
    sortable: true
  },
  {
    key: 'orderedAt',
    text: 'Tanggal Pemesanan',
    sortable: true
  },

  {
    key: 'action',
    text: 'Aksi',
    sortable: false
  }
]

export const ticketStatus = {
  confirmed: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak',
  canceled: 'Batal',
  expired: 'Kadaluarsa',
  ordered: 'Dipesan'
}

export const rejectConfirmationPopup = {
  title: 'Konfirmasi Reject',
  descriptionText: 'Apakah Anda yakin ingin melakukan reject pada tiket ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Reject Tiket',
    variant: 'danger'
  }
}

export const rejectInformationPopup = {
  title: 'Reject Tiket',
  successInformation: {
    descriptionText: 'Tiket ',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Tiket gagal direject',
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
  title: 'Konfirmasi Verifikasi',
  descriptionText: 'Apakah Anda yakin ingin memverifikasi tiket ini?',
  dialogType: 'confirmation',
  buttonLeft: {
    label: 'Batal',
    variant: 'secondary'
  },
  buttonRight: {
    label: 'Ya Verifikasikan',
    variant: 'primary'
  }
}

export const verificationInformationPopup = {
  title: 'Verifikasi Tiket',
  successInformation: {
    descriptionText: 'Tiket berhasil diverifikasi',
    dialogType: 'information',
    buttonRight: {
      label: 'Saya mengerti',
      variant: 'primary'
    }
  },
  failedInformation: {
    descriptionText: 'Tiket gagal diverifikasi',
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
