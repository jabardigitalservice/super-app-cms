export const state = () => ({
  childrenCatagory: 0,
  matureCatagory: 0,
  foreignerCatagory: 0,
  isOpenForm: false,
  refetchCalendar: false,
  reservationDateValue: new Date(),
  sessionValue: null,
  dialogError: null,
  detailItemError: null,
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
  getDialogError: (state) => {
    return state.dialogError
  },
  getDetailItemError: (state) => {
    return state.detailItemError
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
  setDialogError({ commit }, dialogError) {
    commit('setDialogError', dialogError)
  },
  setDetailItemError({ commit }, detailItemError) {
    commit('setDetailItemError', detailItemError)
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
  setDialogError(state, dialogError) {
    state.dialogError = dialogError
  },
  setDetailItemError(state, detailItemError) {
    state.detailItemError = detailItemError
  },
}
