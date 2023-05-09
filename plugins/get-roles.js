import VueJwtDecode from 'vue-jwt-decode'

export default ({ $auth }, inject) => {
  if ($auth.strategy.token.get()) {
    const tokenBearer = $auth.strategy.token.get()
    const token = tokenBearer.split(' ')
    const tokenDecode = VueJwtDecode.decode(token[1])
    inject('role', tokenDecode.realm_access.roles)
  }
}
