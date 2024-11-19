export const state = () => ({
  isShowPopup: false,
  isFollowup: false,
  dataIkp: {},
  dialogConfirmation: {
    title: '',
    nameModal: '',
    descriptionText: 'Apakah Anda yakin ingin menindaklanjuti aduan tersebut?',
  },
  isCreateIkp: false, // popup confirmation for form create ikp
  complaintType: '',
})

export const getters = {
  getIsShowPopup: (state) => {
    return state.isShowPopup
  },
  getIsFollowup: (state) => {
    return state.isFollowup
  },
  getDataIkp: (state) => {
    return state.dataIkp
  },
  getDialogConfirmation: (state) => {
    return state.dialogConfirmation
  },
  getIsCreateIkp: (state) => {
    return state.isCreateIkp
  },
  getComplaintType: (state) => {
    return state.complaintType
  },
}

export const actions = {
  showPopupConfirmation({ commit, state }) {
    commit('setIsShowPopup', false)
    commit('modals/OPEN', state.dialogConfirmation.nameModal, { root: true })
  },
}

export const mutations = {
  setIsShowPopup(state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  setIsFollowup(state, isFollowup) {
    state.isFollowup = isFollowup
  },
  setDataIkp(state, dataIkp) {
    state.dataIkp = dataIkp
  },
  setDialogConfirmation(state, dialogConfirmation) {
    state.dialogConfirmation = dialogConfirmation
  },
  setIsCreateIkp(state, isCreateIkp) {
    state.isCreateIkp = isCreateIkp
  },
  setComplaintType(state, complaintType) {
    state.complaintType = complaintType
  },
}
