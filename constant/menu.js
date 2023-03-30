const mainMenu =
{
  titleMenu: 'RW',
  role: 'admin',
  menu: [
    {
      name: 'Klaim Akun RW',
      path: 'index',
      arrow: false,
      role: 'admin'
    },
    {
      name: 'Kegiatan RW',
      path: 'activities',
      arrow: true,
      role: 'admin'
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
    arrow: false,
    role: 'admin'
  }]
}

const tiketMuseumMenu =
{
  titleMenu: 'tiket museum',
  role: 'admin_ticket',
  menu: [{
    name: 'Tiket Museum',
    path: 'ticket-museum',
    arrow: false,
    role: 'admin_ticket'
  }]
}

const masterDataMenu =
{
  titleMenu: 'master data',
  role: 'admin',
  menu: [{
    name: 'Kelola Pengguna',
    path: 'data-user',
    arrow: true,
    role: 'admin'
  },
  {
    name: 'Konfigurasi',
    path: 'configuration',
    arrow: true,
    role: 'admin'
  },
  {
    name: 'Manajemen Rilis',
    path: 'management-release',
    arrow: true,
    role: 'admin'
  }]
}

const menu = [mainMenu,
  messageNotifMenu,
  masterDataMenu,
  tiketMuseumMenu]

export {
  menu
}
