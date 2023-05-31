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
    path: 'management-user',
    arrow: false
  },
  {
    name: 'Konfigurasi',
    path: 'configuration',
    arrow: true
  }
  // TODO: api is currently not ready, so I hide the menu, until the configuration with the API is complete
  // {
  //   name: 'Manajemen Rilis',
  //   path: 'management-release',
  //   arrow: false
  // }
  ]
}

const menu = [mainMenu,
  messageNotifMenu,
  tiketMuseumMenu,
  masterDataMenu
]

export {
  menu
}
