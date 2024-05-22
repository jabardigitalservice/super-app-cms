import { menu } from '@/constant/menuList.js'

export default function ({ $role, route, redirect, $auth, $unleash }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    // redirect first login by role
    if (route.path === '/') {
      if ($role.includes('admin:mraj_officer') && !$role.includes('admin')) {
        return redirect('/ticket-museum')
      } else if ($role.includes('tahura_officer') && !$role.includes('admin')) {
        return redirect('/tahura/dashboard')
      }
    }

    const allowedRoutesForAllRoles = [
      '/',
      '/login',
      '/logout',
      '/verifikasi-email',
      '/buat-password',
      '/buat-password/informasi',
      '/unauthorized',
    ]

    const allowedRoutesMenu = menu
      .flatMap((menuItem) => menuItem.menu || [])
      .filter((menu) => {
        const isUnleashEnabled = (unleashVariable) => {
          if (!unleashVariable) {
            return true
          }

          return $unleash.isEnabled(unleashVariable)
        }

        return (
          menu?.showMenuAndAccessForRoles?.some((value) =>
            $role.includes(value)
          ) && isUnleashEnabled(menu.unleashVariable)
        )
      })
      .map((detailSubMenu) => detailSubMenu.path)

    const allowedRoutesChild = menu
      .flatMap((menuItem) => menuItem.childRoute || [])
      .filter((childRoute) => {
        const isUnleashEnabled = (unleashVariable) => {
          if (!unleashVariable) {
            return true
          }

          return $unleash.isEnabled(unleashVariable)
        }

        return (
          childRoute?.accessChildRouteForRoles?.some((value) =>
            $role.includes(value)
          ) && isUnleashEnabled(menu.unleashVariable)
        )
      })
      .map((detailSubMenu) => detailSubMenu.path)

    const allowedRoutesByRoles = [...allowedRoutesMenu, ...allowedRoutesChild]

    const isRouteAllowed = allowedRoutesByRoles.some((routePattern) => {
      return (
        route.path === routePattern || route.path.startsWith(routePattern + '/')
      )
    })

    if (!isRouteAllowed && !allowedRoutesForAllRoles.includes(route.path)) {
      // Pengguna tidak memiliki akses ke halaman saat ini, redirect atau tindakan lain
      redirect('/unauthorized')
    }
  }
}
