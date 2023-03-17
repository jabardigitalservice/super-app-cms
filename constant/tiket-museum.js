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
    sortable: false
  },
  {
    key: 'sessionName',
    text: 'sesi',
    sortable: false
  },
  {
    key: 'reservation_date',
    text: 'Tanggal Reservasi',
    sortable: false
  },
  {
    key: 'ticketCount',
    text: 'Jumlah Tiket',
    sortable: false
  },
  {
    key: 'status',
    text: 'Status',
    sortable: false
  },
  {
    key: 'orderedAt',
    text: 'Tanggal Pemesanan',
    sortable: false
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
