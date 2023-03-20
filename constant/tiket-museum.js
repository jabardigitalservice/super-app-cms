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
