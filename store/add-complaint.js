import { ENDPOINT_ADUAN } from '~/constant/endpoint-api'

export const state = () => ({
  dataInformationComplaint: {
    sp4n_id: '',
    sp4n_created_at: '',
    user_name: '',
    title: '',
    description: '',
  },
  dataLocationComplaint: {
    city_id: '',
    city_name: '',
    district_id: '',
    district_name: '',
    village_id: '',
    village_name: '',
    address_detail: '',
  },
  dataOtherComplaint: {
    category_id: '',
    category_child_id: '',
    sub_category_id: '',
    subcategory_child_id: '',
    disposition: '',
    authority: 'Pemerintah Provinsi Jawa Barat',
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
  getDataLocationComplaint: (state) => {
    return state.dataLocationComplaint
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
        source_id: 'sp4n',
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
  clearDataInformationComplaint({ commit }) {
    const dataInformationComplaint = {
      sp4n_id: '',
      sp4n_created_at: '',
      user_name: '',
      title: '',
      description: '',
    }
    commit('setDataInformationComplaint', dataInformationComplaint)
  },
  clearDataLocationComplaint({ commit }) {
    const dataLocationComplaint = {
      city_id: '',
      district_id: '',
      village_id: '',
      address_detail: '',
    }
    commit('setDataLocationComplaint', dataLocationComplaint)
  },
  clearDataOtherComplaint({ commit }) {
    const dataOtherComplaint = {
      category_id: '',
      subcategory_id: '',
      disposition: '',
      authority: 'Pemerintah Provinsi Jawa Barat',
    }
    commit('setDataOtherComplaint', dataOtherComplaint)
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
