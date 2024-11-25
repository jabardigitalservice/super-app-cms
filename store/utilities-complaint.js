import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_NON_PEMPROV,
} from '~/constant/endpoint-api'

export const state = () => ({
  listCategory: [],
  listSubCategory: [],
  listAuthorities: [], // data cakupan urusan
  listDisposition: [], // data nama instansi
  listGovResponsible: [], // data opd pemprov penanggung jawab
  listCity: [], // list data kabupaten / kota
  listDistrict: [], // list data kecamatan
  listVillage: [], // list data desa/ kelurahan
  listNonGovComplaintStatus: [], // list status aduan khusus non pemprov
})

export const actions = {
  async getDataCategory({ commit }) {
    try {
      // handle list data category
      const response = await this.$axios.get(`${ENDPOINT_ADUAN}/categories`)
      commit('setListCategory', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
  async getDataSubCategory({ commit }, complaintCategoryId) {
    try {
      const response = await this.$axios.get(
        `${ENDPOINT_ADUAN}/subcategories`,
        {
          params: {
            complaint_category_id: complaintCategoryId,
          },
        }
      )
      commit('setListSubCategory', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
  // handle data cakupan urusan
  async getDataAuthorities({ commit }) {
    try {
      const response = await this.$axios.get(`${ENDPOINT_ADUAN}/authorities`)
      commit('setListAuthorities', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
  // handle data nama instansi
  async getDataDispositions({ commit }, authority) {
    try {
      const response = await this.$axios.get(`${ENDPOINT_ADUAN}/dispositions`, {
        params: { authority },
      })
      commit('setListDispositions', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
  // handle data opd pemprov penanggung jawab
  async getDataGovResponsible({ commit }) {
    try {
      const response = await this.$axios.get(`${ENDPOINT_ADUAN}/opds`, {
        params: { level: 'pemprov' },
      })
      commit('setListGovResponsible', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },

  async getDataCity({ commit }) {
    try {
      const response = await this.$axios.get('/area/city', {
        params: { provinceId: 32 },
      })
      commit('setListCity', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },

  async getDataDistrict({ commit }, cityId) {
    try {
      const response = await this.$axios.get('/area/district', {
        params: { cityId },
      })
      commit('setListDistrict', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },

  async getDataVillage({ commit }, districtId) {
    try {
      const response = await this.$axios.get('/area/village', {
        params: { districtId },
      })
      commit('setListVillage', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
  async getNonGovComplaintStatus({ commit }) {
    try {
      const response = await this.$axios.get(
        `${ENDPOINT_ADUAN_NON_PEMPROV}/status`
      )

      commit('setListNonGovComplaintStatus', response.data.data)
    } catch (error) {
      console.error(error)
    }
  },
}

export const mutations = {
  setListCategory(state, listCategory) {
    state.listCategory = listCategory
  },
  setListSubCategory(state, listSubCategory) {
    state.listSubCategory = listSubCategory
  },
  setListAuthorities(state, listAuthorities) {
    state.listAuthorities = listAuthorities
  },
  setListDispositions(state, listDisposition) {
    state.listDisposition = listDisposition
  },
  setListGovResponsible(state, listGovResponsible) {
    state.listGovResponsible = listGovResponsible
  },
  setListCity(state, listCity) {
    state.listCity = listCity
  },
  setListDistrict(state, listDistrict) {
    state.listDistrict = listDistrict
  },
  setListVillage(state, listVillage) {
    state.listVillage = listVillage
  },
  setListNonGovComplaintStatus(state, listNonGovComplaintStatus) {
    state.listNonGovComplaintStatus = listNonGovComplaintStatus
  },
}
