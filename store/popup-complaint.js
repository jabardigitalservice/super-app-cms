export const state = () => ({
  detailItem: {},
  dataDialog: {
    title: '',
    nameModal: '',
    descriptionText: '',
    button: {
      label: '',
      variant: '',
    },
  },
  dataComplaint: {},
  isMockApi: false,
  isSuccess: false,
})

export const actions = {
  showPopupFollowupHotlineJabar({ commit }, { dataComplaint, dialogName }) {
    commit('setDataComplaint', dataComplaint)
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
      commit('setDataDialog', {
        nameModal: dataDialogSuccess.nameModal,
        dialogModal: {
          ...dataDialogSuccess.dialogModal,
          icon: { name: 'check-mark-circle', fill: '#069550' },
        },
      })
      commit('setIsSuccess', true)
      commit('modals/OPEN', state.dataDialog.nameModal, { root: true })
    } catch {
      commit('setDataDialog', {
        nameModal: dataDialogFailed.nameModal,
        dialogModal: {
          ...dataDialogFailed.dialogModal,
          icon: { name: 'times-circle', fill: '#EF5350' },
        },
      })
      commit('setIsSuccess', false)
      commit('modals/OPEN', dataDialogFailed.nameModal, { root: true })
    }
  },
}

export const mutations = {
  setDataComplaint(state, dataComplaint) {
    state.dataComplaint = dataComplaint
  },
  setDataDialog(state, dataDialog) {
    state.dataDialog = dataDialog
  },
  setIsMockApi(state, isMockApi) {
    state.isMockApi = isMockApi
  },
  setIsSuccess(state, isSuccess) {
    state.isSuccess = isSuccess
  },
}
