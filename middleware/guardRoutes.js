export default function ({ $role, route, redirect, $auth, params }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    // redirect first login by role
    if (route.path === '/') {
      if ($role.includes('admin_ticket') && !$role.includes('admin')) {
        return redirect('/ticket-museum')
      }
    }

    // guard routes by roles

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
