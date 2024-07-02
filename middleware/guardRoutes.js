import { menu } from '@/constant/menuList.js'

export default function ({ $role, route, redirect, $auth, $unleash }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    // redirect first login by role
    if (route.path === '/') {
      const role = [
        { role: 'admin:mraj_officer', link: '/ticket-museum' }, // link path for redirect first login
        { role: 'tahura_officer', link: '/tahura/dashboard' },
        { role: 'admin:aduan-team-1', link: '/aduan/dashboard' },
        { role: 'admin:aduan-team-2', link: '/aduan/dashboard' },
        { role: 'admin:aduan-team-3', link: '/aduan/penginputan-ikp' },
        { role: 'admin:aduan-team-opd', link: '/aduan/instruksi-aduan-warga' },
        {
          role: 'admin:aduan-user-management',
          link: '/aduan/instruksi-aduan-warga',
        },
      ]

      role.forEach((item) => {
        if ($role.includes(item.role) && !$role.includes('admin')) {
          return redirect(item.link)
        }
      })
    }

    const allowedRoutesForAllRoles = [
      '/',
      '/login',
      '/logout',
      '/verifikasi-email',
      '/buat-password',
      '/buat-password/informasi',
      '/lupa-kata-sandi',
      '/cek-email',
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
