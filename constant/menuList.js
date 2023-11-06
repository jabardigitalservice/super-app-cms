const rwMenu = {
  titleMenu: 'RW',
  showTitleMenuForRoles: ['admin'],
  menu: [
    {
      name: 'Klaim Akun RW',
      path: '/',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'item.svg'
    },
    {
      name: 'Kegiatan RW',
      path: '/activities',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'item.svg'
    }
  ],
  childRoute: [
    {
      path: '/detail',
      accessChildRouteForRoles: ['admin']
    }
  ]
}

const messageNotifMenu = {
  titleMenu: 'pesan dan notif',
  showTitleMenuForRoles: ['admin'],
  menu: [
    {
      name: 'Pesan',
      path: '/message-notif',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'item.svg'
    }
  ]
}

const tiketMuseumMenu = {
  titleMenu: 'tiket museum',
  showTitleMenuForRoles: ['admin_ticket'],
  menu: [
    {
      name: 'Tiket Museum',
      path: '/ticket-museum',
      arrow: false,
      showMenuAndAccessForRoles: ['admin_ticket'],
      icon: 'item.svg'
    }
  ]
}

const masterDataMenu = {
  titleMenu: 'master data',
  showTitleMenuForRoles: ['admin'],
  menu: [
    // TODO : This menu cannot be displayed yet, because the API is not ready.
    // {
    //   name: 'Kelola Pengguna',
    //   path: 'management-user',
    //   arrow: false,
    // showMenuAndAccessForRoles: ['admin']
    // }
    {
      name: 'Konfigurasi',
      path: '/configuration',
      arrow: true,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'item.svg'
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
  menu: [
    {
      name: 'Daftar Aduan Masuk',
      path: '/aduan/aduan-masuk',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'clipboard-list.svg'
    },
    {
      name: 'Daftar Penentuan Kewenangan',
      path: '/aduan/penentuan-kewenangan',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'clipboard-user.svg'
    },
    {
      name: 'Dialihkan ke SP4N',
      path: '/aduan/dialihkan-ke-span-lapor',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'clipboard-arrow-left.svg'
    },
    {
      name: 'Daftar Aduan dari SP4N',
      path: '/aduan/aduan-dari-span-lapor',
      arrow: false,
      showMenuAndAccessForRoles: ['admin'],
      icon: 'clipboard-pencil.svg'
    }
  ]
}

const tahuraMenu = {
  titleMenu: 'Ticketing Tahura',
  showTitleMenuForRoles: ['admin', 'tahura_officer'],
  menu: [
    {
      name: 'Dashboard',
      path: '/tahura/dashboard',
      arrow: false,
      showMenuAndAccessForRoles: ['admin', 'tahura_officer'],
      icon: 'speedo-meter.svg'
    },
    {
      name: 'Daftar Pesanan',
      path: '/tahura/daftar-pesanan',
      arrow: false,
      showMenuAndAccessForRoles: ['admin', 'tahura_officer'],
      icon: 'ticket.svg'
    },
    {
      name: 'Laporan Pendapatan',
      path: '/tahura/laporan-pendapatan',
      arrow: false,
      showMenuAndAccessForRoles: ['admin', 'tahura_officer'],
      icon: 'news-paper.svg'
    }
  ],
  childRoute: [
    {
      path: '/tahura/preview-pdf',
      accessChildRouteForRoles: ['admin', 'tahura_officer']
    }
  ]
}

export const menu = [
  rwMenu,
  messageNotifMenu,
  tiketMuseumMenu,
  masterDataMenu,
  aduanMenu,
  tahuraMenu
]
