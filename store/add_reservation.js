export const state = () => ({
  childrenCatagory: 0,
  matureCatagory: 0,
  foreignerCatagory: 0,
  isOpenForm: false,
  refetchCalendar: false,
  reservationDateValue: new Date(),
  sessionValue: null,
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
  getReservationDateValue: (state) => {
    return state.reservationDateValue
  },
  getSessionValue: (state) => {
    return state.sessionValue
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
  setReservationDateValue({ commit }, reservationDateValue) {
    commit('setReservationDateValue', reservationDateValue)
  },
  setSessionValue({ commit }, sessionValue) {
    commit('setSessionValue', sessionValue)
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
  setReservationDateValue(state, reservationDateValue) {
    state.reservationDateValue = reservationDateValue
  },
  setSessionValue(state, sessionValue) {
    state.sessionValue = sessionValue
  },
}
