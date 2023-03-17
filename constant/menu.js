const mainMenu = [
  {
    name: 'Klaim Akun RW',
    path: 'index',
    arrow: false,
    role: 'rw'
  },
  {
    name: 'Kegiatan RW',
    path: 'activities',
    arrow: true,
    role: 'rw'
  }
]

const messageNotifMenu = [
  {
    name: 'Pesan',
    path: 'message-notif',
    arrow: false,
    role: 'rw'
  }
]

const tiketMuseumMenu = [
  {
    name: 'Tiket Museum',
    path: 'ticket-museum',
    arrow: false,
    role: 'rw'
  }
]

const masterDataMenu = [
  {
    name: 'Kelola Pengguna',
    path: 'data-user',
    arrow: true,
    role: 'rw'
  },
  {
    name: 'Konfigurasi',
    path: 'configuration',
    arrow: true,
    role: 'rw'
  },
  {
    name: 'Manajemen Rilis',
    path: 'management-release',
    arrow: true,
    role: 'rw'
  }
]

export {
  mainMenu,
  messageNotifMenu,
  masterDataMenu,
  tiketMuseumMenu
}
