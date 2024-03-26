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
  modalForm: { title: '', modalName: '' },
})

export const getters = {
  getDetailItem: (state) => {
    return state.detailItem
  },
  getModalForm: (state) => {
    return state.modalForm
  },
}

export const actions = {
  showConfirmationDialog({ state, commit }, typeDialog) {
    commit('modals/OPEN', confirmationDialog[typeDialog].nameModal, {
      root: true,
    })
  },
  showPopupFormAccount({ commit }, { modalName, payload = null }) {
    const modalForm = {}
    modalForm.modalName = modalName
    if (modalName === 'addAccount') {
      modalForm.title = 'Tambah Akun'
    } else {
      modalForm.title = 'Kirim Ulang Email'
      commit('setPayload', payload)
    }
    commit('setModalForm', modalForm)
    commit('modals/OPEN', modalName, { root: true })
  },
}

export const mutations = {
  setDetailItem(state, detailItem) {
    state.detailItem = detailItem
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setModalForm(state, modalForm) {
    state.modalForm = modalForm
  },
}
