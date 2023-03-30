export default function ({ $role, route, redirect, $auth, params }) {
  if ($auth.strategy.token.get()) {
    const allowedRolesPathAdminRW = ['/', `/detail/${params.id}`, '/activities', '/message-notif', '/message-notif/create', `/message-notif/detail/${params.id}`, '/data-user', '/configuration', '/management-release']
    const allowedRolesPathAdminTicket = ['/ticket-museum', `/ticket-museum/detail/${params.invoice}`]

    const allowedRoutes = [
      { routes: allowedRolesPathAdminRW, role: 'admin' },
      { routes: allowedRolesPathAdminTicket, role: 'admin_ticket' }
    ]

    const isAuthorized = allowedRoutes.flatMap((route) => {
      if ($role.includes(route.role)) {
        return route.routes
      }
      return []
    }).includes(route.path)

    if (route.path !== '/unauthorized') {
      if (!isAuthorized) {
        return redirect('/unauthorized')
      }
    }
  }
}
