export const state = () => ({
  isShowPopup: false,
  isFollowup: false,
  dataIkp: {}
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
  }
}

export const mutations = {
  setIsShowPopup (state, isShowPopup) {
    state.isShowPopup = isShowPopup
  },
  setIsFollowup (state, isFollowup) {
    state.isFollowup = isFollowup
  },
  setDataIkp (state, dataIkp) {
    state.dataIkp = dataIkp
  }
}
