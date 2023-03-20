const mainMenu = [
  {
    name: 'Klaim Akun RW',
    path: 'index',
    arrow: false,
    role: 'adminRW'
  },
  {
    name: 'Kegiatan RW',
    path: 'activities',
    arrow: true,
    role: 'adminRW'
  }
]

const messageNotifMenu = [
  {
    name: 'Pesan',
    path: 'message-notif',
    arrow: false,
    role: 'adminRW'
  }
]

const tiketMuseumMenu = [
  {
    name: 'Tiket Museum',
    path: 'ticket-museum',
    arrow: false,
    role: 'adminRW'
  }
]

const masterDataMenu = [
  {
    name: 'Kelola Pengguna',
    path: 'data-user',
    arrow: true,
    role: 'adminRW'
  },
  {
    name: 'Konfigurasi',
    path: 'configuration',
    arrow: true,
    role: 'adminRW'
  },
  {
    name: 'Manajemen Rilis',
    path: 'management-release',
    arrow: true,
    role: 'adminRW'
  }
]

export {
  mainMenu,
  messageNotifMenu,
  masterDataMenu,
  tiketMuseumMenu
}
