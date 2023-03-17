import VueJwtDecode from 'vue-jwt-decode'

export default ({ $auth }, inject) => {
  console.log(this.$auth, 'auth')
  const isAdmin = () => {
    const tokenBearer = this.$auth.strategy.token.get()
    const token = tokenBearer.split(' ')
    const tokenDecode = VueJwtDecode.decode(token[1])
    if (tokenDecode.realm_access.roles.includes('admin')) {
      return true
    }
    return false
  }

  const role = () => {
    return {
      isAdmin
    }
  }

  console.log(isAdmin)

  inject('role', role)
}
