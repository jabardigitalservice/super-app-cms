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

export const userStatus = {
  waiting: 'Menunggu Verifikasi',
  verified: 'Terverifikasi',
  rejected: 'Ditolak'
}
