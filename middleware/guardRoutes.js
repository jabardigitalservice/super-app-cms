export default function ({ $role, route, redirect, $auth, params }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    const allowedRolesPathAdminRW = ['/', `/detail/${params.id}`, '/activities', '/message-notif', '/message-notif/create', `/message-notif/detail/${params.id}`, '/data-user', '/configuration', '/management-release']

    // redirect first login by role
    if ($role.includes('admin_ticket')) {
      if (route.path === '/') {
        return redirect('/ticket-museum')
      }
    }

    // guard routes for admin rw
    if (!$role.includes('admin') && allowedRolesPathAdminRW.includes(route.path)) {
      return redirect('/unauthorized')
    }

    // guard routes for admin ticket
    const allowedRolesPathAdminTicket = ['/ticket-museum', `/ticket-museum/detail/${params.invoice}`]
    if (!$role.includes('admin_ticket') && allowedRolesPathAdminTicket.includes(route.path)) {
      return redirect('/unauthorized')
    }
  }
}
