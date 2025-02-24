export const state = () => ({
  isShowPopup: false,
  isTruncate: false,
  ikpNarrative: '',
  dataComplaint: {},
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
}

export const actions = {
  checkTruncate({ state, commit }) {
    if (state.ikpNarrative.length >= 125) {
      commit('setIsTruncate', true)
    } else {
      commit('setIsTruncate', false)
    }
  },
  clearPayload({ commit }) {
    commit('setPayload', {
      narrative: '',
      deadline_at: '',
      description: '',
      indicator_value: '',
      indicator_unit: '',
      opd_id: '',
      opd_name: '',
      coverage_of_affairs: '',
      opd_pemprov_id: '',
    })
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
  setDataComplaint(state, dataComplaint) {
    state.dataComplaint = dataComplaint
  },
}
