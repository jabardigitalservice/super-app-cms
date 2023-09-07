const rwMenu = {
  titleMenu: 'RW',
  showTitleMenuForRoles: ['admin'],
  menu: [
    {
      name: 'Klaim Akun RW',
      path: '/',
      arrow: false,
      showMenuAndAccessForRoles: ['admin']
    },
    {
      name: 'Kegiatan RW',
      path: 'activities',
      arrow: false,
      showMenuAndAccessForRoles: ['admin']

    }
  ],
  childRoute: [
    {
      path: 'detail',
      accessChildRouteForRoles: ['admin']
    }
  ]
}

const messageNotifMenu =
{
  titleMenu: 'pesan dan notif',
  showTitleMenuForRoles: ['admin'],
  menu: [{
    name: 'Pesan',
    path: 'message-notif',
    arrow: false,
    showMenuAndAccessForRoles: ['admin']
  }]
}

const tiketMuseumMenu =
{
  titleMenu: 'tiket museum',
  showTitleMenuForRoles: ['admin_ticket'],
  menu: [{
    name: 'Tiket Museum',
    path: 'ticket-museum',
    arrow: false,
    showMenuAndAccessForRoles: ['admin_ticket']
  }]
}

const masterDataMenu =
{
  titleMenu: 'master data',
  showTitleMenuForRoles: ['admin'],
  menu: [
    // TODO : This menu cannot be displayed yet, because the API is not ready.
    // {
    //   name: 'Kelola Pengguna',
    //   path: 'management-user',
    //   arrow: false,
    // showMenuAndAccessForRoles: ['admin']
    // },
    {
      name: 'Konfigurasi',
      path: 'configuration',
      arrow: true,
      showMenuAndAccessForRoles: ['admin']
    }
    // TODO: api is currently not ready, so I hide the menu, until the configuration with the API is complete
    // {
    //   name: 'Manajemen Rilis',
    //   path: 'management-release',
    //   arrow: false,
    // showMenuAndAccessForRoles: ['admin']
    // }
  ]
}

const aduanMenu = {
  titleMenu: 'aduan',
  showTitleMenuForRoles: ['admin'],
  menu: [{
    name: 'Daftar Aduan Masuk',
    path: 'aduan/aduan-masuk',
    arrow: false,
    showMenuAndAccessForRoles: ['admin']
  }, {
    name: 'Daftar Aduan Diproses',
    path: 'aduan/aduan-di-proses',
    arrow: false,
    showMenuAndAccessForRoles: ['admin']
  }, {
    name: 'Daftar Aduan Dialihkan ke SP4N',
    path: 'aduan/dialihkan-ke-span',
    arrow: false,
    showMenuAndAccessForRoles: ['admin']
  }]
}

export const menu = [
  rwMenu,
  messageNotifMenu,
  tiketMuseumMenu,
  masterDataMenu,
  aduanMenu
]
