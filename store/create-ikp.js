export const state = () => ({
  isShowPopup: false,
  isTruncate: false,
  ikpNarrative: '',
  payload: {
    narrative: '',
    deadline_at: '',
    description: '',
    indicator_value: '',
    indicator_unit: '',
    opd_id: '',
    opd_name: '',
    coverage_of_affairs: '',
    opd_pemprov_id: '',
  },
  complaintType: '',
})

export const getters = {
  getIsShowPopup: (state) => {
    return state.isShowPopup
  },
  getIkpNarrative: (state) => {
    return state.ikpNarrative
  },
  getIsTruncate: (state) => {
    return state.isTruncate
  },
  getPayload: (state) => {
    return state.payload
  },
  getComplaintType: (state) => {
    return state.complaintType
  },
}

export const actions = {
  checkTruncate({ state, commit }) {
    if (state.ikpNarrative.length >= 125) {
      commit('setIsTruncate', true)
    } else {
      commit('setIsTruncate', false)
    }
  },
}

export const mutations = {
  setIsShowPopup(state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  setIkpNarrative(state, ikpNarrative) {
    state.ikpNarrative = ikpNarrative
  },
  setIsTruncate(state, isTruncate) {
    state.isTruncate = isTruncate
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setComplaintType(state, complaintType) {
    state.complaintType = complaintType
  },
}
