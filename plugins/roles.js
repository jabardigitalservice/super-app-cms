import VueJwtDecode from 'vue-jwt-decode'

export default ({ $auth, store, auth }, inject) => {
  const tokenBearer = $auth.strategy.token.get()
  const token = tokenBearer.split(' ')
  const tokenDecode = VueJwtDecode.decode(token[1])

  if (tokenDecode.realm_access.roles.includes('admin')) {
    inject('role', 'rw')
  } else {
    inject('role', 'tiket')
  }
}
