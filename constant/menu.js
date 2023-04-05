const mainMenu =
{
  titleMenu: 'RW',
  role: 'admin',
  menu: [
    {
      name: 'Klaim Akun RW',
      path: 'index',
      arrow: false

    },
    {
      name: 'Kegiatan RW',
      path: 'activities',
      arrow: true

    }
  ]
}

const messageNotifMenu =
{
  titleMenu: 'pesan dan notif',
  role: 'admin',
  menu: [{
    name: 'Pesan',
    path: 'message-notif',
    arrow: false
  }]
}

const tiketMuseumMenu =
{
  titleMenu: 'tiket museum',
  role: 'admin_ticket',
  menu: [{
    name: 'Tiket Museum',
    path: 'ticket-museum',
    arrow: false
  }]
}

const masterDataMenu =
{
  titleMenu: 'master data',
  role: 'admin',
  menu: [{
    name: 'Kelola Pengguna',
    path: 'data-user',
    arrow: true
  },
  {
    name: 'Konfigurasi',
    path: 'configuration',
    arrow: true
  },
  {
    name: 'Manajemen Rilis',
    path: 'management-release',
    arrow: true
  }]
}

const menu = [mainMenu,
  messageNotifMenu,
  tiketMuseumMenu,
  masterDataMenu
]

export {
  menu
}
