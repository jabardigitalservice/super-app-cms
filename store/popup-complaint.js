export const state = () => ({
  detailItem: {},
  dataDialogConfirmation: {},
  dataDialogInformation: {},
  dataComplaint: {},
  isMockApi: false,
  isSuccess: false,
  isLoading: false,
})

export const actions = {
  showPopupFollowupHotlineJabar({ commit }, { dataComplaint, dialogName }) {
    commit('setDataComplaint', dataComplaint)
    commit('modals/OPEN', dialogName, { root: true })
  },
  backToForm({ commit }, dialogName) {
    commit('modals/CLOSEALL', { root: true })
    commit('modals/OPEN', dialogName, { root: true })
  },
  async integrationApi(
    { state, commit },
    { dataApi, payload, dataDialogSuccess, dataDialogFailed }
  ) {
    commit('modals/CLOSEALL', null, { root: true })
    try {
      // using mock api
      if (state.isMockApi) {
        await this.$mockApi[dataApi.method](dataApi.url, { ...payload })
      } else {
        await this.$axios[dataApi.method](dataApi.url, { ...payload })
      }
      commit('setDataDialogInformation', {
        nameModal: dataDialogSuccess.nameModal,
        dialogModal: {
          ...dataDialogSuccess.dialogModal,
          icon: { name: 'check-mark-circle', fill: '#069550' },
        },
      })
      commit('setIsSuccess', true)
      commit('modals/OPEN', dataDialogSuccess.nameModal, { root: true })
    } catch {
      commit('setDataDialogInformation', {
        nameModal: dataDialogFailed.nameModal,
        dialogModal: {
          ...dataDialogFailed.dialogModal,
          icon: { name: 'times-circle', fill: '#EF5350' },
        },
      })
      commit('setIsSuccess', false)
      commit('modals/OPEN', dataDialogFailed.nameModal, { root: true })
    } finally {
      commit('setIsLoading', false)
    }
  },
}

export const mutations = {
  setDataComplaint(state, dataComplaint) {
    state.dataComplaint = dataComplaint
  },
  setDataDialogConfirmation(state, dataDialogConfirmation) {
    state.dataDialogConfirmation = dataDialogConfirmation
  },
  setDataDialogInformation(state, dataDialogInformation) {
    state.dataDialogInformation = dataDialogInformation
  },
  setIsMockApi(state, isMockApi) {
    state.isMockApi = isMockApi
  },
  setIsSuccess(state, isSuccess) {
    state.isSuccess = isSuccess
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
}
