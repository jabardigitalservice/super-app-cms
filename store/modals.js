const store = {
  namespaced: true,
  state: {
    open: []
  },
  mutations: {
    OPEN (state, payload) {
      state.open.unshift(payload)
    },
    CLOSE (state, payload) {
      state.open = state.open.filter(e => e !== payload)
    },
    CLOSEALL (state) {
      state.open = []
    }
  }
}

export default store
