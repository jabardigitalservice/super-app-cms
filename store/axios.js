export const state = () => ({
  authorizationHeaders: {},
})

export const mutations = {
  setAuthorizationHeader(state, header) {
    state.authorizationHeaders = header
  },
}
