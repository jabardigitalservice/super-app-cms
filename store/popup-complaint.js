export const state = () => ({
  dataComplaint: {},
})

export const actions = {
  showPopupFollowupHotlineJabar({ commit }, { dataComplaint, dialogName }) {
    commit('setDataComplaint', dataComplaint)
    commit('modals/OPEN', dialogName, { root: true })
  },
  async integrationApi({ state }, { dataApi, payload }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.$axios[dataApi.method](dataApi.url, {
        ...payload,
      })
      return response
    } catch (error) {
      throw error
    }
  },
}

export const mutations = {
  setDataComplaint(state, dataComplaint) {
    state.dataComplaint = dataComplaint
  },
}