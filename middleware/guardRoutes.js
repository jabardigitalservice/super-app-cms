
import { menu } from '@/constant/menuList.js'

export default function ({ $role, route, redirect, $auth, params }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    // redirect first login by role
    if (route.path === '/') {
      if ($role.includes('admin_ticket') && !$role.includes('admin')) {
        return redirect('/ticket-museum')
      }
    }

    const allowedRoutesForAllRoles = ['/', '/login', '/logout', '/unauthorized']

    const allowedRoutesMenu = menu
      .flatMap(menuItem => menuItem.menu || [])
      .filter(menu =>
        menu?.showMenuAndAccessForRoles?.some(value => $role.includes(value))
      )
      .map(detailSubMenu => detailSubMenu.path)

    const allowedRoutesChild = menu
      .flatMap(menuItem => menuItem.childRoute || [])
      .filter(childRoute =>
        childRoute?.accessChildRouteForRoles?.some(value => $role.includes(value))
      )
      .map(detailSubMenu => detailSubMenu.path)

    const allowedRoutesByRoles = [...allowedRoutesMenu, ...allowedRoutesChild]

    const hasMatchingRoute = allowedRoutesByRoles.some(routePattern =>
      route.path.startsWith(`/${routePattern}`)
    )

    if (!hasMatchingRoute && !allowedRoutesForAllRoles.includes(route.path)) {
      // Pengguna tidak memiliki akses ke halaman saat ini, redirect atau tindakan lain
      redirect('/unauthorized')
    }
  }
}
