export const state = () => ({
  page: 'Klaim Akun RW',
  isError: false,
  errorMessage: false,
  header: {
    navigations: [],
    descriptionPage: ''
  }
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
  },
  setHeader (state, header) {
    state.header.navigations = header.navigations
    state.header.descriptionPage = header.descriptionPage
  }
}
