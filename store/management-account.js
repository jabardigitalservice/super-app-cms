import { confirmationDialog } from '~/constant/management-user'

export const state = () => ({
  detailItem: {},
  payload: {
    name: '',
    email: '',
    roleId: '',
    organizationId: '',
    employeeStatus: '',
    employeeNumber: '',
  },
})

export const getters = {
  getDetailItem: (state) => {
    return state.detailItem
  },
}

export const actions = {
  showConfirmationDialog({ state, commit }, typeDialog) {
    commit('modals/OPEN', confirmationDialog[typeDialog].nameModal, {
      root: true,
    })
  },
}

export const mutations = {
  setDetailItem(state, detailItem) {
    state.detailItem = detailItem
  },
  setPayload(state, payload) {
    state.payload = payload
  },
}
