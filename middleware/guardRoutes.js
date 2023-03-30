export default function ({ $role, route, redirect, $auth, params }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    const allowedRolesPathAdminRW = ['/', '/activities', '/message-notif', '/data-user', '/configuration', '/management-release', `/detail/${params.id}`]

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
    const allowedRolesPathAdminTicket = ['/ticket-museum']
    if (!$role.includes('admin_ticket') && allowedRolesPathAdminTicket.includes(route.path)) {
      return redirect('/unauthorized')
    }
  }
}
