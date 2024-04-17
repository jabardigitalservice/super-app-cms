export const state = () => ({
  childrenCatagory: 0,
  matureCatagory: 0,
  foreignerCatagory: 0,
  isOpenForm: false,
  refetchCalendar: false,
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
  getIsOpenForm: (state) => {
    return state.isOpenForm
  },
  getRefetchCalendar: (state) => {
    return state.refetchCalendar
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
  setIsOpenForm({ commit }, isOpenForm) {
    commit('setIsOpenForm', isOpenForm)
  },
  setRefetchCalendar({ commit }, refetchCalendar) {
    commit('setRefetchCalendar', refetchCalendar)
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
  setIsOpenForm(state, isOpenForm) {
    state.isOpenForm = isOpenForm
  },
  setRefetchCalendar(state, refetchCalendar) {
    state.refetchCalendar = refetchCalendar
  },
}
