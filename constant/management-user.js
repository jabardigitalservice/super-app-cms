import { iconPopup } from './icon-popup-new'

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
  { key: 'role_name', text: 'Role' },
  { key: 'organization_name', text: 'Instansi', sortable: true },
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

export const informationDialog = {
  success: {
    icon: iconPopup.success,
    delete: {
      title: 'Berhasil Dihapus',
      descriptionText: 'Akun berhasil dihapus',
      nameModal: 'delete-success-information',
    },
    nonActive: {
      title: 'Berhasil Dinon-aktifkan',
      descriptionText: 'Akun berhasil dinon-aktifkan',
      nameModal: 'non-active-success-information',
    },
    active: {
      title: 'Berhasil Diaktifkan',
      descriptionText: 'Akun berhasil diaktifkan',
      nameModal: 'active-success-information',
    },
  },
  error: {
    icon: iconPopup.failed,
    delete: {
      title: 'Gagal Dihapus',
      descriptionText: 'Akun gagal dihapus',
      nameModal: 'delete-error-information',
      button: {
        label: 'Ulangi,Hapus',
        variant: 'danger',
      },
    },
    nonActive: {
      title: 'Gagal Menon-aktifkan',
      descriptionText: 'Akun gagal dinon-aktifkan',
      nameModal: 'non-active-error-information',
      button: {
        label: 'Ulangi, Nonaktifkan',
        variant: 'danger',
      },
    },
    active: {
      title: 'Gagal Mengaktifkan',
      descriptionText: 'Akun gagal diaktifkan',
      nameModal: 'active-error-information',
      button: {
        label: 'Ulangi, Aktifkan',
        variant: 'primary',
      },
    },
  },
}

export const apiPathAdminComplaint = '/users/admin/complaint'
