export default function ({ $role, route, redirect, $auth, params }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    const allowedRolesPathAdminRW = ['/', '/activities', '/message-notif', '/data-user', '/configuration', '/management-release', `/detail/${params.id}`]

    // redirect first login by role
    if ($role === 'adminTicket') {
      if (route.path === '/') {
        return redirect('/ticket-museum')
      }
    }

    // guard routes for admin rw
    if ($role !== 'adminRW' && allowedRolesPathAdminRW.includes(route.path)) {
      return redirect('/unauthorized')
    }

    //  todo : if role in API  ready i used this code
    // guard routes for admin ticket
    // const allowedRolesPathAdminTicket = ['/ticket-museum']
    // if ($role !== 'adminTicket' && allowedRolesPathAdminTicket.includes(route.path)) {
    //   return redirect('/unauthorized')
    // }
  }
}
