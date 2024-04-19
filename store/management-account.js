import {
  confirmationDialog,
  informationDialog,
  apiPathAdminComplaint,
} from '~/constant/management-user'

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
  httpMethod: '',
  apiPath: '',
  confirmationDialog,
  informationDialog,
  isSuccessInformation: false,
  typeDialog: '',
})

export const getters = {
  getDetailItem: (state) => {
    return state.detailItem
  },
  getModalForm: (state) => {
    return state.modalForm
  },
  getHttpMethod: (state) => {
    return state.httpMethod
  },
  getApiPath: (state) => {
    return state.apiPath
  },
  getSuccessInformation: (state) => {
    return state.isSuccessInformation
  },
  getConfirmationDialog: (state) => {
    return state.confirmationDialog
  },
  getInformationDialog: (state) => {
    return state.informationDialog
  },
  getTypeDialog: (state) => {
    return state.typeDialog
  },
}

export const actions = {
  showConfirmationDialog({ state, commit }, { typeDialog, detailAccount }) {
    const apiPath = `${apiPathAdminComplaint}/${detailAccount.id}`
    commit('setApiPath', apiPath)
    commit('setTypeDialog', typeDialog)
    if (typeDialog === 'active') {
      commit('setApiPath', `${apiPath}/activate`)
    } else if (typeDialog === 'nonActive') {
      commit('setApiPath', `${apiPath}/deactivate`)
    }
    commit('setConfirmationDialog', confirmationDialog[typeDialog])
    commit('modals/OPEN', confirmationDialog[typeDialog].nameModal, {
      root: true,
    })
  },
  showInformationDialog({ state, commit }, isSuccess) {
    commit('modals/CLOSEALL', null, { root: true })
    commit('setSuccessInformation', isSuccess)
    if (isSuccess) {
      commit('setInformationDialog', {
        icon: informationDialog.success.icon,
        ...informationDialog.success[state.typeDialog],
      })
    } else {
      commit('setInformationDialog', {
        icon: informationDialog.error.icon,
        ...informationDialog.error[state.typeDialog],
      })
    }
    commit('modals/OPEN', state.informationDialog.nameModal, { root: true })
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
  backToPopupConfirmation({ state, commit }) {
    commit('modals/CLOSEALL', null, { root: true })
    commit('modals/OPEN', state.confirmationDialog.nameModal, {
      root: true,
    })
  },
}

export const mutations = {
  setDetailItem(state, detailItem) {
    state.detailItem = detailItem
  },
  setApiPath(state, apiPath) {
    state.apiPath = apiPath
  },
  setTypeDialog(state, typeDialog) {
    state.typeDialog = typeDialog
  },
  setHttpMethod(state, httpMethod) {
    state.httpMethod = httpMethod
  },
  setPayload(state, payload) {
    state.payload = payload
  },
  setModalForm(state, modalForm) {
    state.modalForm = modalForm
  },
  setSuccessInformation(state, isSuccessInformation) {
    state.isSuccessInformation = isSuccessInformation
  },
  setConfirmationDialog(state, confirmationDialog) {
    state.confirmationDialog = confirmationDialog
  },
  setInformationDialog(state, informationDialog) {
    state.informationDialog = informationDialog
  },
}
