import { confirmationDialog } from '~/constant/management-user'

export const state = () => ({
  detailItem: {},
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
}
