import VueJwtDecode from 'vue-jwt-decode'

export default ({ $auth }, inject) => {
  if ($auth.strategy.token.get()) {
    const tokenBearer = $auth.strategy.token.get()
    const token = tokenBearer.split(' ')
    const tokenDecode = VueJwtDecode.decode(token[1])

    if (tokenDecode.realm_access.roles.includes('admin')) {
      inject('role', 'adminRW')
    } else {
      inject('role', 'adminTicket')
    }
  }
}
