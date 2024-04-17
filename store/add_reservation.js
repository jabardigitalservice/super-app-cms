export const state = () => ({
  childrenCatagory: 0,
  matureCatagory: 0,
  foreignerCatagory: 0,
})

export const getters = {
  getChildrenCatagory: (state) => {
    return state.childrenCatagory
  },
  getMatureCatagory: (state) => {
    return state.matureCatagory
  },
  getForeignerCatagory: (state) => {
    return state.foreignerCatagory
  },
}
export const actions = {
  setChildrenCatagory({ commit }, childrenCatagory) {
    commit('setChildrenCatagory', childrenCatagory)
  },
  setMatureCatagory({ commit }, matureCatagory) {
    commit('setMatureCatagory', matureCatagory)
  },
  setForeignerCatagory({ commit }, foreignerCatagory) {
    commit('setForeignerCatagory', foreignerCatagory)
  },
}
export const mutations = {
  setChildrenCatagory(state, childrenCatagory) {
    state.childrenCatagory = childrenCatagory
  },
  setMatureCatagory(state, matureCatagory) {
    state.matureCatagory = matureCatagory
  },
  setForeignerCatagory(state, foreignerCatagory) {
    state.foreignerCatagory = foreignerCatagory
  },
}
