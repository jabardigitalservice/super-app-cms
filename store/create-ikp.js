export const state = () => ({
  isShowPopup: false,
  isTruncate: false,
  ikpNarrative: '',
  dataIkp: {}
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
  }
}

export const actions = {
  checkTruncate ({ state, commit }) {
    if (state.ikpNarrative.length >= 125) {
      commit('setIsTruncate', true)
    } else {
      commit('setIsTruncate', false)
    }
  }
}

export const mutations = {
  setIsShowPopup (state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  setIkpNarrative (state, ikpNarrative) {
    state.ikpNarrative = ikpNarrative
  },
  setIsTruncate (state, isTruncate) {
    state.isTruncate = isTruncate
  }
}
