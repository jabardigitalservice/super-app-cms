import { ENDPOINT_ADUAN } from '~/constant/endpoint-api'

export const state = () => ({
  dataInformationComplaint: {
    sp4n_id: '',
    span_created_at: '',
    user_name: '',
    title: '',
    description: '',
  },
  dataLocationComplaint: {
    city_id: '',
    district_id: '',
    subdistrict_id: '',
    address_detail: '',
  },
  dataOtherComplaint: {
    complaint_category_id: '',
    complaint_subcategory_id: '',
    disposition: '',
    authority: '',
  },
  dataAddComplaint: {},
  isValidFormInformationComplaint: true,
  isValidFormLocationComplaint: true,
  isValidFormOtherComplaint: true,
  isLoading: false,
  isError: false,
})

export const getters = {
  getIsValidFormInformationComplaint: (state) => {
    return state.isValidFormInformationComplaint
  },
  getDataInformationComplaint: (state) => {
    return state.dataInformationComplaint
  },
  getIsValidFormLocationComplaint: (state) => {
    return state.isValidFormLocationComplaint
  },
  getIsValidFormOtherComplaint: (state) => {
    return state.isValidFormOtherComplaint
  },
  getIsLoading: (state) => {
    return state.isLoading
  },
  getIsError: (state) => {
    return state.isError
  },
}

export const actions = {
  async submitDataAddComplaint({ state, commit }) {
    commit('setIsLoading', true)
    try {
      const dataAddComplaint = {
        ...state.dataInformationComplaint,
        ...state.dataLocationComplaint,
        ...state.dataOtherComplaint,
      }
      await this.$axios.post(ENDPOINT_ADUAN, {
        ...dataAddComplaint,
        user_id: this.$auth?.user?.identifier,
        user_email: this.$auth?.user?.email,
        type: 'private',
        complaint_source: 'sp4n',
      })
    } catch {
      commit('setIsError', true)
    } finally {
      commit('setIsLoading', false)
    }
  },
}

export const mutations = {
  setDataInformationComplaint(state, dataInformationComplaint) {
    state.dataInformationComplaint = dataInformationComplaint
  },
  setIsValidFormInformationComplaint(state, isValidFormInformationComplaint) {
    state.isValidFormInformationComplaint = isValidFormInformationComplaint
  },
  setDataLocationComplaint(state, dataLocationComplaint) {
    state.dataLocationComplaint = dataLocationComplaint
  },
  setIsValidFormLocationComplaint(state, isValidFormLocationComplaint) {
    state.isValidFormLocationComplaint = isValidFormLocationComplaint
  },
  setDataOtherComplaint(state, dataOtherComplaint) {
    state.dataOtherComplaint = dataOtherComplaint
  },
  setIsValidFormOtherComplaint(state, isValidFormOtherComplaint) {
    state.isValidFormOtherComplaint = isValidFormOtherComplaint
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setIsError(state, isError) {
    state.isError = isError
  },
}
