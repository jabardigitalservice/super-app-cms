export default function ({ $role, redirect, route, $auth }) {
  if (route.path !== '/login' && $auth.strategy.token.get()) {
    if ($role === 'tiket') {
      if (route.path === '/') {
        return redirect('/ticket-museum')
      }
    }
  }
}
