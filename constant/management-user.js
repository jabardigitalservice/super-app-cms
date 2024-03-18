export const managementUserHeader = [
  { key: 'account', text: 'Nama Akun', sortable: true },
  { key: 'phone_number', text: 'No. Handphone', sortable: true },
  { key: 'email', text: 'Email', sortable: true },
  { key: 'createdAt', text: 'Tanggal Registrasi', sortable: true },
  { key: 'action', text: 'Aksi' },
]

export const managementAccountComplaintHeader = [
  { key: 'name', text: 'Nama', sortable: true },
  { key: 'email', text: 'Email', sortable: true },
  { key: 'role', text: 'Role' },
  { key: 'organization', text: 'Instansi' },
  { key: 'status_name', text: 'Status' },
  { key: 'action', text: 'Aksi' },
]

export const managementAccountComplaintStatus = Object.freeze({
  total: {
    id: 'total',
    name: 'Semua Akun',
    statusColor: '',
    icon: '/icon/icon-aduan/management-account/all-account-icon.svg',
  },
  unverified: {
    id: 'unverified',
    name: 'Belum Terverifikasi',
    value: 0,
    statusColor: 'yellow',
    icon: '/icon/icon-aduan/management-account/unverified-account-icon.svg',
  },
  active: {
    id: 'active',
    name: 'Aktif',
    value: 0,
    statusColor: 'green',
    icon: '/icon/icon-aduan/management-account/active-account-icon.svg',
  },
  not_active: {
    id: 'not_active',
    name: 'Tidak Aktif',
    value: 0,
    statusColor: 'red',
    icon: '/icon/icon-aduan/management-account/non-active-account-icon.svg',
  },
})

export const confirmationDialog = {
  active: {
    title: 'Konfirmasi Aktifkan Akun',
    descriptionText: 'Apakah Anda yakin ingin mengkatifkan akun ini?',
    nameModal: 'active-confirmation',
    button: {
      label: 'Aktifkan',
      variant: 'primary',
    },
  },
  nonActive: {
    title: 'Konfirmasi Non-aktifkan Akun',
    descriptionText: 'Apakah Anda yakin ingin menon-aktifkan akun ini?',
    nameModal: 'non-active-confirmation',
    button: {
      label: 'Nonaktifkan',
      variant: 'danger',
    },
  },
  delete: {
    title: 'Konfirmasi Hapus Akun',
    descriptionText: 'Apakah Anda yakin ingin menghapus akun ini?',
    nameModal: 'delete-confirmation',
    button: {
      label: 'Hapus',
      variant: 'danger',
    },
  },
}
