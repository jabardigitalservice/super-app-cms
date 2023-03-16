export const state = () => ({
  page: 'Klaim Akun RW',
  isError: false,
  errorMessage: false
})

export const actions = {
  async deleteMessageNotifHandle ({ commit }, id) {
    try {
      await this.$axios.delete(`/messages/${id}`)
    } catch (error) {
      commit('setError', true)
    }
  }
}

export const mutations = {
  setActivePage (state, page) {
    state.page = page
  },
  setError (state, error) {
    state.isError = error
  }
}
